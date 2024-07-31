'use client';

import { useCurrentRole } from "@/hooks/use-current-role";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";

const AdminPage =  () => {
    
    const onApiRouteClick = () => {
       fetch("/api/admin")
        .then((response) => {
            if (response.ok) {
                console.log("OKAY")
            }
        })
    }
    
    return (   
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                🔑 Admin
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess 
                      message="You are allowed to see this page!"
                    />
                </RoleGate>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-mdeium">
                        Admin-only API Route
                    </p>
                    <Button>
                        Click to test
                    </Button>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-mdeium">
                        Admin-only Server Action
                    </p>
                    <Button>
                        Click to test
                    </Button>
                </div>
            </CardContent>
        </Card>
     );
};

export default AdminPage;