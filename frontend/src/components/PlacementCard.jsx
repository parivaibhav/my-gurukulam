"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PlacementCard({ placement }) {
  return (
    <Card className="p-3">
      <CardHeader>
        <CardTitle>{placement.companyName}</CardTitle>
        <p className="text-sm text-muted-foreground">{placement.jobRole}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        {placement.package && <p>💰 {placement.package}</p>}
        {placement.location && <p>📍 {placement.location}</p>}
        <p>📅 {new Date(placement.driveDate).toLocaleDateString()}</p>
        {placement.description && (
          <p className="text-sm text-gray-600">{placement.description}</p>
        )}

        {/* Selected Students */}
        {placement.selectedStudents?.length > 0 && (
          <div className="mt-3">
            <p className="font-semibold">Selected Students:</p>
            <div className="flex flex-wrap gap-3 mt-2">
              {placement.selectedStudents.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  {s.profileImage && (
                    <img
                      src={s.profileImage}
                      alt={s.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <span>{s.studentName}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
