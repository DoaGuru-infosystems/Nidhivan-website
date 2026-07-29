import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const DUMMY_LEADS = [
    { id: 1, name: 'Suresh Kumar', email: 'suresh.k@example.com', date: 'Oct 20, 2025', message: 'I am interested in buying a 3BHK flat in your upcoming project. Please send details.' },
    { id: 2, name: 'Priya Verma', email: 'priya.v@example.com', date: 'Oct 21, 2025', message: 'What is the starting price for commercial shops?' },
    { id: 3, name: 'Amit Singh', email: 'amit99@example.com', date: 'Oct 22, 2025', message: 'Can we schedule a site visit this weekend?' },
];

const ContactLeadsManagement = () => {
    const [leads, setLeads] = useState(DUMMY_LEADS);
    const [selectedLead, setSelectedLead] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleViewMessage = (lead) => {
        setSelectedLead(lead);
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Contact Leads</h1>
                    <p className="text-gray-500">View inquiries submitted through the contact form.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leads.map((lead) => (
                                <TableRow key={lead.id}>
                                    <TableCell className="font-medium">{lead.name}</TableCell>
                                    <TableCell>{lead.email}</TableCell>
                                    <TableCell>{lead.date}</TableCell>
                                    <TableCell className="text-right">
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            onClick={() => handleViewMessage(lead)}
                                        >
                                            View Message
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Message from {selectedLead?.name}</DialogTitle>
                        <DialogDescription>
                            Received on {selectedLead?.date}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <div className="mb-4">
                            <span className="font-semibold text-sm text-gray-500 block mb-1">Email Address:</span>
                            <span className="text-gray-900">{selectedLead?.email}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-sm text-gray-500 block mb-1">Message Content:</span>
                            <div className="bg-gray-50 p-4 rounded-md border text-gray-800 whitespace-pre-wrap">
                                {selectedLead?.message}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ContactLeadsManagement;
