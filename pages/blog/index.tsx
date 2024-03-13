import { TOKEN } from "@/constants/names";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Blog(){

    const router = useRouter();

    useEffect(()=>{
        const token = localStorage.getItem(TOKEN);
        if(!token )
            router.push('/login');


    },[])


    return <>
        <Link href={"/blog/create"}><Button>Create Blog</Button></Link>
    </>
}

export default Blog;