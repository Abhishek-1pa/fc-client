import { AxSecure } from "./axSecure";

class LLMSecure extends AxSecure{
    constructor(){
        // super("http://localhost:8003")
        super("https://llm.forge-code.com");
    }
}

const llmsecure = new LLMSecure();
export default llmsecure;