
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentRole } from "@/lib/auth";
const AdminPage = async () => {
    const role =  await currentRole();


    return (   
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                🔑 Admin
                </p>
            </CardHeader>
            <CardContent className="space-y-4">

            </CardContent>
        </Card>
     );
};

export default AdminPage;