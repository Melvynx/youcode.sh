import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { MDXRemote } from 'next-mdx-remote/rsc';

const markdown = `### **YouCode Terms and Conditions (FAKE)**

**Last Updated: October 18, 2023**

> **IMPORTANT**: THESE TERMS AND CONDITIONS ("TERMS") ARE FAKE AND FOR ENTERTAINMENT PURPOSES ONLY.

## 1. **Introduction**

**Company Name**: YouCode  
**Address**: 123 Fake Street, Narnia  
**Platform**: www.youcode.fake

### 1.1 Agreement to Terms

By accessing or using the YouCode Platform, you agree to comply with and be bound by these Terms. This is a FAKE platform to learn.

## 2. **Registration and Account**

### 2.1 Eligibility

You must be at least 18 years old to register on YouCode. 

### 2.2 Account Security

You are responsible for all activity that occurs under your account.

## 3. **Courses and Content**

### 3.1 Availability

YouCode offers FAKE courses in programming, business, and other subjects.

### 3.2 Licensing

By enrolling in a course, YouCode grants you a non-transferable license to access the course material.

## 4. **Payments**

### 4.1 Payment Terms

All payments for courses are final and non-refundable.

## 5. **Termination**

YouCode reserves the right to terminate your account at any time.

## 6. **Disclaimer**

This platform is FAKE and should not be considered as a legitimate educational platform.

## 7. **Contact**

For any questions about these FAKE Terms, contact us at:

- Email: fake@youcode.com
- Address: 123 Fake Street, Narnia`;

export default function page() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>CGV</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="prose dark:prose-invert mb-8">
        <MDXRemote source={markdown} />
      </LayoutContent>
    </Layout>
  );
}
