import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { MDXRemote } from 'next-mdx-remote/rsc';

const markdown = `### **YouCode Privacy Policy (FAKE)**

**Last Updated: October 18, 2023**

> **IMPORTANT**: THIS PRIVACY POLICY ("POLICY") IS FAKE AND FOR ENTERTAINMENT PURPOSES ONLY.

## 1. **Introduction**

**Company Name**: YouCode  
**Address**: 123 Fake Street, Narnia  
**Platform**: www.youcode.fake

### 1.1 Acceptance of Privacy Policy

By using YouCode, you signify your acceptance of this FAKE Privacy Policy.

## 2. **Information We Collect**

### 2.1 Personal Information

YouCode may ask for names, emails, and other personal details. However, this is a FAKE platform, and no real data is collected.

### 2.2 Cookies

YouCode may use FAKE cookies to improve user experience.

## 3. **Use of Information**

### 3.1 Purposes

We may use your information for FAKE educational purposes and to send you FAKE promotions.

### 3.2 Sharing Information

We do not share your FAKE personal information with third parties.

## 4. **Data Security**

### 4.1 Security Measures

We take FAKE measures to secure your information, even though this is not a real platform.

## 5. **Children’s Privacy**

This platform is not intended for use by children under the age of 18.

## 6. **Changes to Privacy Policy**

YouCode reserves the right to change this FAKE Privacy Policy at any time.

## 7. **Contact**

For any questions about this FAKE Privacy Policy, contact us at:

- Email: fake@youcode.com
- Address: 123 Fake Street, Narnia`;

export default function page() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Privacy</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="prose dark:prose-invert mb-8">
        <MDXRemote source={markdown} />
      </LayoutContent>
    </Layout>
  );
}
