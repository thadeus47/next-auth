'use client';

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole
}


export const RoleGate =({
    children,
    allowedRole,
}: RoleGateProps) => {
    const role = useCurrentRole();  
}