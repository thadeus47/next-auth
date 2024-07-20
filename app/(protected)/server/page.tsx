

import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

const ServerPage = async () => {
    const user = await currentUser();

    if (!user || user.role === undefined || !('isTwoFactorEnabled' in user)) {
        return null; // or handle the case when user is not fully loaded
    }
    
    return (
        <UserInfo 
        label="🖥 Server component"
        user={{
            ...user,
            role: user.role,
            isTwoFactorEnabled: user.isTwoFactorEnabled as boolean
        }}  
        />
    );
}

export default ServerPage;