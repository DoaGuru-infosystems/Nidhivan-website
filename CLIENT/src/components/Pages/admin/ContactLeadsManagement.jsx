import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, Mail, Calendar, User, MessageSquare } from 'lucide-react';

const DUMMY_LEADS = [
    { id: 1, name: 'Suresh Kumar', email: 'suresh.k@example.com', date: 'Oct 20, 2025', message: 'I am interested in buying a 3BHK flat in your upcoming project. Please send details.', isNew: true },
    { id: 2, name: 'Priya Verma', email: 'priya.v@example.com', date: 'Oct 21, 2025', message: 'What is the starting price for commercial shops?', isNew: true },
    { id: 3, name: 'Amit Singh', email: 'amit99@example.com', date: 'Oct 22, 2025', message: 'Can we schedule a site visit this weekend?', isNew: false },
];

const ContactLeadsManagement = () => {
    const [leads, setLeads] = useState(DUMMY_LEADS);
    const [selectedLead, setSelectedLead] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleViewMessage = (lead) => {
        setSelectedLead(lead);
        setIsDialogOpen(true);
        // If it was new, mark it as read in a real app
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Contact Leads</h2>
                    <p className="text-sm text-slate-500 mt-1">View and respond to inquiries submitted through the contact form.</p>
                </div>
            </div>

            <Card className="border-slate-200 shadow-sm overflow-hidden rounded-xl">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg text-slate-800">Recent Inquiries</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent bg-slate-50/50">
                                <TableHead className="text-slate-600 font-semibold py-4 pl-6">Name</TableHead>
                                <TableHead className="text-slate-600 font-semibold py-4">Email</TableHead>
                                <TableHead className="text-slate-600 font-semibold py-4">Date</TableHead>
                                <TableHead className="text-right text-slate-600 font-semibold py-4 pr-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leads.map((lead) => (
                                <TableRow key={lead.id} className="hover:bg-slate-50 transition-colors border-slate-100">
                                    <TableCell className="font-medium text-slate-800 py-4 pl-6">
                                        <div className="flex items-center gap-2">
                                            {lead.name}
                                            {lead.isNew && (
                                                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-600 py-4">{lead.email}</TableCell>
                                    <TableCell className="text-slate-500 py-4">{lead.date}</TableCell>
                                    <TableCell className="text-right py-4 pr-6">
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="text-[#118A43] hover:text-[#0f7a3b] hover:bg-[#118A43]/10 font-medium"
                                            onClick={() => handleViewMessage(lead)}
                                        >
                                            <Eye size={16} className="mr-2" />
                                            View Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[550px] p-0 rounded-xl overflow-hidden">
                    <div className="bg-[#118A43] p-6 text-white">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-white">
                                <User size={24} />
                                Lead Information
                            </DialogTitle>
                            <DialogDescription className="text-white/80 mt-1">
                                Details and message from {selectedLead?.name}
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                    
                    <div className="p-6 bg-slate-50">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-2 text-slate-500 text-sm mb-1 font-medium">
                                    <Mail size={14} /> Email Address
                                </div>
                                <div className="text-slate-800 font-medium">{selectedLead?.email}</div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-2 text-slate-500 text-sm mb-1 font-medium">
                                    <Calendar size={14} /> Date Received
                                </div>
                                <div className="text-slate-800 font-medium">{selectedLead?.date}</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                            <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-2 font-semibold text-slate-700">
                                <MessageSquare size={16} className="text-[#F4B54B]" />
                                Message Content
                            </div>
                            <div className="p-4 text-slate-700 whitespace-pre-wrap leading-relaxed">
                                {selectedLead?.message}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end p-4 bg-white border-t border-slate-100">
                        <Button onClick={() => setIsDialogOpen(false)} className="bg-slate-800 hover:bg-slate-900 text-white px-6">Close</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ContactLeadsManagement;
