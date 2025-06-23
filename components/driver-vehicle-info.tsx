'use client'
import { User, Bus } from 'lucide-react';

const DriverVehicleInfo = ({ driver, vehicle }: { driver: string, vehicle: string }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><User className="w-6 h-6 text-blue-600" /></div>
        <div>
          <p className="text-sm text-gray-500">Driver</p>
          <p className="font-bold text-gray-900">{driver}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><Bus className="w-6 h-6 text-blue-600" /></div>
        <div>
          <p className="text-sm text-gray-500">Vehicle Reg. No.</p>
          <p className="font-bold text-gray-900">{vehicle}</p>
        </div>
      </div>
    </div>
);

export default DriverVehicleInfo;
