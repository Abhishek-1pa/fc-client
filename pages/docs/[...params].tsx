import { useRouter } from "next/router"


export default function Doc() {
    const router = useRouter();
    const {params} = router.query;
    console.log(params)
    return <div>doc</div>
  }