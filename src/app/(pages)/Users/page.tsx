'use client'
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";

const users = [
  { id: 1, name: "Aman Khowal", email: "aman@example.com", joined: "2024-01-15", courses: 5 },
  { id: 2, name: "Ali Haider", email: "ali@example.com", joined: "2024-02-20", courses: 3 },
  { id: 3, name: "Ayush", email: "ayush@example.com", joined: "2024-03-05", courses: 7 },
];

const Users = () => {
  const router = useRouter();

  const handleViewDetails = (id: number) => {
    router.push(`/users/${id}`);
  };

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
              <TableHead>Date of Joining</TableHead>
              <TableHead>Courses Enrolled</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.joined}</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Users;
