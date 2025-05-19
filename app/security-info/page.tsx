"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Sparkles, Users, Lightbulb, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, Database, Server, CheckCircle } from "lucide-react";

export default function SecurityPrivacySection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Security & Privacy</h2>
          <p className="text-gray-700">
            We Prioritize Your Security and Privacy. Use our tools with peace of mind knowing that we implement best security practices and respect your privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <Shield className="w-10 h-10 text-green-500 mb-4" />
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Security Guaranteed</h3>
            <p className="text-gray-600 text-sm">
              <b>No Data Storage:</b> We do not use any databases. All ID card generation processes are performed locally in your browser.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              <CheckCircle className="inline-block w-4 h-4 text-green-500 mr-1 align-middle" /> Verify by inspecting the console
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <Lock className="w-10 h-10 text-green-500 mb-4" />
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Secure Connection</h3>
            <p className="text-gray-600 text-sm">
              Our website uses <b>HTTPS</b> to encrypt all communication between your browser and our servers.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              <CheckCircle className="inline-block w-4 h-4 text-green-500 mr-1 align-middle" /> Verify by looking at the lock icon in your browser
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <Eye className="w-10 h-10 text-green-500 mb-4" />
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Open Code</h3>
            <p className="text-gray-600 text-sm">
              All processes are performed client-side with <b>JavaScript</b> that you can inspect through your browser.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              <CheckCircle className="inline-block w-4 h-4 text-green-500 mr-1 align-middle" /> Verify by inspecting with DevTools
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <Database className="w-10 h-10 text-green-500 mb-4" />
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Privacy Protected</h3>
            <p className="text-gray-600 text-sm">
              <b>No Tracking:</b> We do not use invasive tracking cookies or third-party analytics.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <Server className="w-10 h-10 text-green-500 mb-4" />
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Data Stays On Your Device</h3>
            <p className="text-gray-600 text-sm">
              All the data you enter remains on your device and is <b>never sent to our servers</b>.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <CheckCircle className="w-10 h-10 text-green-500 mb-4" />
            <h3 className="font-semibold text-lg text-gray-800 mb-2">No Account Required</h3>
            <p className="text-gray-600 text-sm">
              You can use all features <b>without needing to create an account</b> or provide personal information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
