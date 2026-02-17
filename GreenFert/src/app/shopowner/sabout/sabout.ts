import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sabout',
  imports: [CommonModule, RouterModule],
  templateUrl: './sabout.html',
  styleUrl: './sabout.scss',
})
export class Sabout implements OnInit {
  particles: any[] = [];

  ngOnInit() {
    // Generate random particles for hero animation
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3
      });
    }
  }

  processSteps = [
    {
      icon: '🏪',
      title: 'Shop Registration',
      description: 'Local shops register on our platform to schedule regular waste collection services'
    },
    {
      icon: '🚛',
      title: 'Waste Collection',
      description: 'Our collection team picks up organic waste from registered shops efficiently'
    },
    {
      icon: '⚗️',
      title: 'Processing',
      description: 'Collected waste is processed in our facility using advanced composting techniques'
    },
    {
      icon: '🌱',
      title: 'Fertilizer Production',
      description: 'Processed waste transforms into high-quality organic fertilizers'
    },
    {
      icon: '🛒',
      title: 'Distribution',
      description: 'Premium fertilizers are sold to customers for agricultural and gardening use'
    }
  ];

  impacts = [
    {
      icon: '♻️',
      value: 'Zero Waste',
      label: 'Complete waste utilization'
    },
    {
      icon: '🌍',
      value: '100%',
      label: 'Organic fertilizers'
    },
    {
      icon: '💚',
      value: 'Sustainable',
      label: 'Circular economy model'
    },
    {
      icon: '⚡',
      value: 'Efficient',
      label: 'Fast processing system'
    }
  ];

  features = [
    {
      icon: '📱',
      title: 'Easy Registration',
      description: 'Simple online registration process for shops and collectors'
    },
    {
      icon: '📍',
      title: 'Real-time Tracking',
      description: 'Track collection requests and deliveries in real-time'
    },
    {
      icon: '💳',
      title: 'Secure Payments',
      description: 'Safe and convenient payment processing for all transactions'
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Monitor your impact and contribution to sustainability'
    },
    {
      icon: '🔔',
      title: 'Smart Notifications',
      description: 'Stay updated with collection schedules and order status'
    },
    {
      icon: '🤝',
      title: 'Community Network',
      description: 'Connect with local shops, collectors, and eco-conscious customers'
    }
  ];

  benefits = [
    {
      icon: '✓',
      title: 'For Shops',
      description: 'Reliable waste collection service, clean premises, and environmental contribution'
    },
    {
      icon: '✓',
      title: 'For Collectors',
      description: 'Organized collection routes, fair compensation, and steady workflow'
    },
    {
      icon: '✓',
      title: 'For Customers',
      description: 'Premium organic fertilizers at competitive prices for healthy gardens'
    },
    {
      icon: '✓',
      title: 'For Environment',
      description: 'Reduced landfill waste and promotion of sustainable agriculture'
    }
  ];
}
