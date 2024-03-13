import { AxSecure } from "./axSecure";

class IamSecure extends AxSecure{
    constructor(){
        super("http://localhost:8001");
    }

}

const iamsecure = new IamSecure();
export default iamsecure;