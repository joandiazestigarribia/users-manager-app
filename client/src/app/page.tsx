import React from 'react';
import UserManagement from '@/components/UserManagement';
import Navbar from '@/components/Navbar';

export default async function Home() {
  return (
    <main className="container mx-auto">
      <Navbar />
      <UserManagement />
    </main>
  );
}