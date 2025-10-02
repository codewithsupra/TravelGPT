import { v } from "convex/values";
import { mutation } from "./_generated/server";
export const newUserr=mutation({
    args:{
        name:v.string(),
        email:v.string(),
        imageUrl:v.string()

    },
    handler:async(ctx,args)=>{
        //if user already exists
        const user=await ctx.db.query('UserTable')
        .filter((q)=>q.eq(q.field('email'),args.email))
        .collect();
        if(user?.length===0){
            //insert the record
            const userData={
                name:args.name,
                imageUrl:args.imageUrl,
                email:args.email
            }
            const result=await ctx.db.insert('UserTable',userData);
            console.log(result);
            return result;
        }
        return user[0];

    }
})

