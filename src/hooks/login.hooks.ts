import { useRoute, useRouter } from "vue-router"
import { UserService } from "@/services/user.service"

export function useLogin(){
    return () => {
        const router = useRoute()
        const route = useRoute()

    if(!UserService.getActiveUser()){
        sessionStorage.setItem('to', route.fullPath)
      //  router.push('/login')
        }
    }
}