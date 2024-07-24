
import { currentRole } from "@/lib/auth";
const AdminPage = async () => {
    const role =  await currentRole();


    return (   
        <div>
            Current role: {role}
        </div>
     );
};

export default AdminPage;