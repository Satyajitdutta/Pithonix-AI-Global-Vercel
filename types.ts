// Fix: Import React to resolve 'Cannot find namespace React' error
import React from 'react';

export interface Agent {
  id: number;
  name: string;
  layer: string;
  attributes: string;
  analogy: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export interface LeadFormData {
  name: string;
  designation: string;
  challenge: string;
  timeline: string;
  phone: string;
  email: string;
}