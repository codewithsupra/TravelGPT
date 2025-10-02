import { mutation, query } from "./_generated/server";
import {v} from "convex/values"

 export const CreateTripDetail=mutation({
    args:{
        tripId:v.string(),
        uid:v.id('UserTable'),
        tripDetail:v.any()
    },
    handler:async(ctx,args)=>{
        const result= await ctx.db.insert('TripDetailTable',
            {
                tripDetail:args.tripDetail,
                tripId:args.tripId,
                uid:args.uid
            });
            return result;
    }
 })

 export const getUserTrips=query({
    args:{
        uid:v.id('UserTable'),
    },
    handler:async(ctx,args)=>{
        const result= await ctx.db.query('TripDetailTable')
        .filter(q=>q.eq(q.field('uid'),args.uid))
        .order('desc')
        .collect();
       
        return result;

    }
 })
 export const getTripById=query({
    args:{
        uid:v.id('UserTable'),
        tripId:v.string()
    },
    handler:async(ctx,args)=>{
        const result= await ctx.db.query('TripDetailTable')
        .filter(q=>q.and(
            q.eq(q.field('uid'),args.uid),
            q.eq(q.field('tripId'),args.tripId)
        ))
        .collect();
       //return the particular trip matched by the trip id
        return result[0];

    }
 })
