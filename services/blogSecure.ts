import { AxSecure } from "./axSecure";

class BlogSecure extends AxSecure{
    constructor(){
        // super("http://localhost:8002");
        super("https://blog.forge-code.com")
    }
}

const blogsecure = new BlogSecure();
export default blogsecure;