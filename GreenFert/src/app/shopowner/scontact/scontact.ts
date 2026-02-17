import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface FAQ {
  question: string;
  answer: string;
  open: boolean;
}

@Component({
  selector: 'app-scontact',
  imports: [CommonModule, RouterModule],
  templateUrl: './scontact.html',
  styleUrl: './scontact.scss',
})
export class Scontact implements OnInit {
  particles: any[] = [];

  ngOnInit() {
    // Generate random particles for animation
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3
      });
    }
  }

  faqs: FAQ[] = [
    {
      question: 'What are your business hours?',
      answer: 'We are open Monday to Friday from 9:00 AM to 6:00 PM IST. Our online support is available 24/7 for urgent queries.',
      open: false
    },
    {
      question: 'How can I track my waste collection?',
      answer: 'You can track your waste collection in real-time through your dashboard. Go to Orders section to view the status of your collection requests.',
      open: false
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept multiple payment methods including UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery for certain services.',
      open: false
    },
    {
      question: 'How do I register my shop?',
      answer: 'Click on the Register button on the homepage, fill in your shop details, upload required documents, and submit for verification. Our team will verify and activate your account within 24 hours.',
      open: false
    },
    {
      question: 'What types of waste can be collected?',
      answer: 'We collect organic waste, biodegradable materials, and other eco-friendly waste products. Please check our waste categories page for detailed information.',
      open: false
    },
    {
      question: 'How do I contact customer support?',
      answer: 'You can reach us via email at support@greenfert.com, call us at +91 1234567890, or use our 24/7 live chat feature for immediate assistance.',
      open: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
