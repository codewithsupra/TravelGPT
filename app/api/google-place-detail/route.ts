import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request:NextRequest){
    try{
    const body= await request.json();
    const{placeName}=body ;
    if(!placeName){
        return NextResponse.json({
            error:"Missing text queru=y"
        },{
            status:400
        })
    }
    const api_key=process.env.GOOGLE_PLACE_API_KEY;
    if (!api_key) {
      return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
    }
    const BASE_URL='https://places.googleapis.com/v1/places:searchText';
    const config={
        headers:{
            'Content-Type':"application/json",
            'X-Goog-Api-Key':api_key,
            'X-Goog-FieldMask': [
                'places.photos',
                'places.displayName',
                'places.id']
        }
    }
    const result= await axios.post(BASE_URL,{
        textQuery:placeName
    },config 
    )
    const placeRefName=result.data.places[0].photos[0].name;
    const PhotoRefUrl=`https://places.googleapis.com/v1/${placeRefName}/media?maxHeightPx=1000&maxWidthPx=1000&key=${process.env.GOOGLE_PLACE_API_KEY}`
    return NextResponse.json(PhotoRefUrl);
}catch(error:unknown){
    const e=error as Error;
    return NextResponse.json({
        error:"Failed to fetch places",
        details:e.message
    },{
        status:500
    })


}

}