'use client'
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { assignRole, getData, User } from "@/actions/users";

const Users = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([])
  const [selectedRoles, setSelectedRoles] = useState<{ [userId: number]: 'STUDENT' | 'EDUCATOR' | 'ADMIN' }>({});

  const handleViewDetails = (id: number) => {
    router.push(`/users/${id}`);
  };


  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      console.log(data)
      setUsers(data)
    }
    fetchData()
  }, [])


  return (
    <Card className="rounded-none border-none shadow-none h-screen">
      <CardHeader>
        <CardTitle>Users List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Courses Enrolled</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Assign Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <button
                    onClick={() => handleViewDetails(user.id)}
                    className="text-blue-500 underline"
                  >
                    {user.courses}
                  </button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleViewDetails(user.id)}>View Details</Button>
                </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <select
                        value={selectedRoles[user.id] ?? user.role}
                        onChange={(e) => {
                          const newRole = e.target.value as 'STUDENT' | 'EDUCATOR' | 'ADMIN';
                          setSelectedRoles(prev => ({ ...prev, [user.id]: newRole }));
                        }}
                        className="border rounded px-2 py-1"
                      >
                        <option value="STUDENT">Student</option>
                        <option value="EDUCATOR">Educator</option>
                        <option value="ADMIN">Admin</option>
                      </select>

                      {selectedRoles[user.id] && selectedRoles[user.id] !== user.role && (
                        <Button
                          variant="outline"
                          onClick={async () => {
                            const newRole = selectedRoles[user.id];
                            const res = await assignRole(user.id, newRole);
                            if (res.success) {
                              const updated = await getData();
                              setUsers(updated);
                              setSelectedRoles(prev => {
                                const { [user.id]: _, ...rest } = prev;
                                return rest;
                              });
                            }
                          }}
                        >
                          Confirm
                        </Button>
                      )}
                    </div>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Users;
