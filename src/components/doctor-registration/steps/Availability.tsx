import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Plus, X, Calendar, Building, Video } from "lucide-react";

interface AvailabilityProps {
  data: any;
  updateData: (section: string, data: any) => void;
}

const daysOfWeek = [
  { key: "monday", label: "Monday", short: "Mon" },
  { key: "tuesday", label: "Tuesday", short: "Tue" },
  { key: "wednesday", label: "Wednesday", short: "Wed" },
  { key: "thursday", label: "Thursday", short: "Thu" },
  { key: "friday", label: "Friday", short: "Fri" },
  { key: "saturday", label: "Saturday", short: "Sat" },
  { key: "sunday", label: "Sunday", short: "Sun" },
];

export const Availability = ({ data, updateData }: AvailabilityProps) => {
  const [selectedDay, setSelectedDay] = useState("monday");

  // CHANGED: Clinic selection for availability
  const updateSelectedClinic = (clinicId: string) => {
    updateData("availability", { selectedClinicId: clinicId });
  };

  const updateDaySchedule = (day: string, updates: any) => {
    const newSchedule = {
      ...(data.availability?.schedule || {}),
      [day]: {
        ...(data.availability?.schedule?.[day] || {
          isWorking: false,
          workHours: { start: "", end: "" },
          breakTimes: [],
          onlineConsultTimes: [],
        }),
        ...updates,
      },
    };
    updateData("availability", { schedule: newSchedule });
  };

  const toggleWorkingDay = (day: string, isWorking: boolean) => {
    updateDaySchedule(day, {
      isWorking,
      workHours: isWorking
        ? { start: "09:00", end: "17:00" }
        : { start: "", end: "" },
      breakTimes: isWorking ? [] : [],
      onlineConsultTimes: isWorking ? [] : [],
    });
  };

  const updateWorkHours = (
    day: string,
    type: "start" | "end",
    time: string,
  ) => {
    const currentHours = data.availability?.schedule?.[day]?.workHours || {
      start: "",
      end: "",
    };
    updateDaySchedule(day, {
      workHours: { ...currentHours, [type]: time },
    });
  };

  const addBreakTime = (day: string) => {
    const currentBreaks = data.availability?.schedule?.[day]?.breakTimes || [];
    updateDaySchedule(day, {
      breakTimes: [...currentBreaks, { start: "12:00", end: "13:00" }],
    });
  };

  // NEW: Add online consultation times like break times
  const addOnlineConsultTime = (day: string) => {
    const currentOnlineSlots =
      data.availability?.schedule?.[day]?.onlineConsultTimes || [];
    updateDaySchedule(day, {
      onlineConsultTimes: [
        ...currentOnlineSlots,
        { start: "18:00", end: "19:00" },
      ],
    });
  };

  const updateBreakTime = (
    day: string,
    index: number,
    type: "start" | "end",
    time: string,
  ) => {
    const currentBreaks = [
      ...(data.availability?.schedule?.[day]?.breakTimes || []),
    ];
    currentBreaks[index] = { ...currentBreaks[index], [type]: time };
    updateDaySchedule(day, { breakTimes: currentBreaks });
  };

  const updateOnlineConsultTime = (
    day: string,
    index: number,
    type: "start" | "end",
    time: string,
  ) => {
    const currentOnlineSlots = [
      ...(data.availability?.schedule?.[day]?.onlineConsultTimes || []),
    ];
    currentOnlineSlots[index] = { ...currentOnlineSlots[index], [type]: time };
    updateDaySchedule(day, { onlineConsultTimes: currentOnlineSlots });
  };

  const removeBreakTime = (day: string, index: number) => {
    const currentBreaks = data.availability?.schedule?.[day]?.breakTimes || [];
    updateDaySchedule(day, {
      breakTimes: currentBreaks.filter((_: any, i: number) => i !== index),
    });
  };

  const removeOnlineConsultTime = (day: string, index: number) => {
    const currentOnlineSlots =
      data.availability?.schedule?.[day]?.onlineConsultTimes || [];
    updateDaySchedule(day, {
      onlineConsultTimes: currentOnlineSlots.filter(
        (_: any, i: number) => i !== index,
      ),
    });
  };

  const copyScheduleToAll = (sourceDay: string) => {
    const sourceSchedule = data.availability?.schedule?.[sourceDay];
    if (!sourceSchedule) return;

    const newSchedule = { ...(data.availability?.schedule || {}) };

    daysOfWeek.forEach(({ key }) => {
      if (key !== sourceDay) {
        newSchedule[key] = { ...sourceSchedule };
      }
    });

    updateData("availability", { schedule: newSchedule });
  };

  const getWorkingDaysCount = () => {
    if (!data.availability?.schedule) return 0;
    return Object.values(data.availability.schedule).filter(
      (day: any) => day.isWorking,
    ).length;
  };

  const selectedClinic = data.contactInfo?.clinics?.find(
    (clinic: any) => clinic.id === data.availability?.selectedClinicId,
  );

  return (
    <div className="space-y-6">
      {/* CHANGED: First select clinic for availability */}
      <Card className="border-l-4 border-l-primary-green">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <Building className="w-5 h-5 text-primary-green" />
            Select Clinic for Availability Setup
          </h3>

          {!data.contactInfo?.clinics ||
          data.contactInfo.clinics.length === 0 ? (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
              <Building className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="font-medium">No clinics added yet</p>
              <p className="text-sm">
                Please add clinics in the Contact Information step first
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Select
                value={data.availability?.selectedClinicId || ""}
                onValueChange={updateSelectedClinic}
              >
                <SelectTrigger className="border-gray-300 focus:border-primary-green focus:ring-primary-green">
                  <SelectValue placeholder="Choose a clinic to set availability" />
                </SelectTrigger>
                <SelectContent>
                  {data.contactInfo.clinics.map((clinic: any) => (
                    <SelectItem key={clinic.id} value={clinic.id}>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{clinic.name}</span>
                        <span className="text-xs text-gray-500">
                          {clinic.address}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedClinic && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800">
                      Setting availability for:
                    </span>
                  </div>
                  <div className="text-green-700">
                    <div className="font-medium">{selectedClinic.name}</div>
                    <div className="text-sm">{selectedClinic.address}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Card */}
      {data.availability?.selectedClinicId && (
        <>
          <Card className="border-l-4 border-l-secondary-green bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-secondary-green" />
                Weekly Availability Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-green">
                    {getWorkingDaysCount()}
                  </div>
                  <div className="text-sm text-gray-600">Working Days</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary-green">
                    {data.availability?.schedule
                      ? Object.values(data.availability.schedule)
                          .filter((day: any) => day.isWorking)
                          .reduce(
                            (total: number, day: any) =>
                              total + (day.breakTimes?.length || 0),
                            0,
                          )
                      : 0}
                  </div>
                  <div className="text-sm text-gray-600">Break Slots</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-blue">
                    {data.availability?.schedule
                      ? Object.values(data.availability.schedule)
                          .filter((day: any) => day.isWorking)
                          .reduce(
                            (total: number, day: any) =>
                              total + (day.onlineConsultTimes?.length || 0),
                            0,
                          )
                      : 0}
                  </div>
                  <div className="text-sm text-gray-600">Online Slots</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-green">
                    {data.availability?.schedule &&
                    Object.values(data.availability.schedule).some(
                      (day: any) => day.isWorking && day.workHours?.start,
                    )
                      ? "✓"
                      : "✗"}
                  </div>
                  <div className="text-sm text-gray-600">Hours Set</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Day Selection */}
          <Card className="border-l-4 border-l-accent-blue">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-primary-text mb-4">
                Select Day to Configure
              </h3>
              <div className="grid grid-cols-7 gap-2">
                {daysOfWeek.map(({ key, label, short }) => (
                  <Button
                    key={key}
                    variant={selectedDay === key ? "default" : "outline"}
                    onClick={() => setSelectedDay(key)}
                    className={`p-4 flex flex-col items-center gap-1 ${
                      selectedDay === key
                        ? "bg-primary-green hover:bg-secondary-green text-white"
                        : "border-gray-300 hover:border-primary-green"
                    }`}
                  >
                    <span className="text-xs font-medium">{short}</span>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        data.availability?.schedule?.[key]?.isWorking
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Day Configuration */}
          <Card className="border-l-4 border-l-accent-green">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-primary-text flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent-green" />
                  {daysOfWeek.find((d) => d.key === selectedDay)?.label}{" "}
                  Schedule
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor={`working-${selectedDay}`}
                      className="text-primary-text font-medium"
                    >
                      Working Day
                    </Label>
                    <Switch
                      id={`working-${selectedDay}`}
                      checked={
                        data.availability?.schedule?.[selectedDay]?.isWorking ||
                        false
                      }
                      onCheckedChange={(checked) =>
                        toggleWorkingDay(selectedDay, checked)
                      }
                    />
                  </div>
                  {data.availability?.schedule?.[selectedDay]?.isWorking && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyScheduleToAll(selectedDay)}
                      className="text-primary-green border-primary-green hover:bg-primary-green hover:text-white"
                    >
                      Copy to All Days
                    </Button>
                  )}
                </div>
              </div>

              {data.availability?.schedule?.[selectedDay]?.isWorking ? (
                <div className="space-y-6">
                  {/* Work Hours */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-primary-text">
                      Clinic Hours
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-600">
                          Start Time
                        </Label>
                        <Input
                          type="time"
                          value={
                            data.availability?.schedule?.[selectedDay]
                              ?.workHours?.start || ""
                          }
                          onChange={(e) =>
                            updateWorkHours(
                              selectedDay,
                              "start",
                              e.target.value,
                            )
                          }
                          className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-600">
                          End Time
                        </Label>
                        <Input
                          type="time"
                          value={
                            data.availability?.schedule?.[selectedDay]
                              ?.workHours?.end || ""
                          }
                          onChange={(e) =>
                            updateWorkHours(selectedDay, "end", e.target.value)
                          }
                          className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Break Times */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-primary-text">
                        Break Times
                      </h4>
                      <Button
                        size="sm"
                        onClick={() => addBreakTime(selectedDay)}
                        className="bg-secondary-green hover:bg-primary-green"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Break
                      </Button>
                    </div>

                    {!data.availability?.schedule?.[selectedDay]?.breakTimes ||
                    data.availability.schedule[selectedDay].breakTimes
                      .length === 0 ? (
                      <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-lg">
                        No breaks scheduled
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {data.availability.schedule[selectedDay].breakTimes.map(
                          (breakTime: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                            >
                              <Badge
                                variant="secondary"
                                className="bg-secondary-green text-white"
                              >
                                Break {index + 1}
                              </Badge>
                              <div className="grid grid-cols-2 gap-2 flex-1">
                                <Input
                                  type="time"
                                  value={breakTime.start}
                                  onChange={(e) =>
                                    updateBreakTime(
                                      selectedDay,
                                      index,
                                      "start",
                                      e.target.value,
                                    )
                                  }
                                  className="border-gray-300 focus:border-secondary-green focus:ring-secondary-green"
                                />
                                <Input
                                  type="time"
                                  value={breakTime.end}
                                  onChange={(e) =>
                                    updateBreakTime(
                                      selectedDay,
                                      index,
                                      "end",
                                      e.target.value,
                                    )
                                  }
                                  className="border-gray-300 focus:border-secondary-green focus:ring-secondary-green"
                                />
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  removeBreakTime(selectedDay, index)
                                }
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ),
                        )}
                      </div>
                    )}
                  </div>

                  {/* NEW: Online Consultation Times */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-primary-text flex items-center gap-2">
                        <Video className="w-4 h-4 text-accent-blue" />
                        Online Consultation Times
                      </h4>
                      <Button
                        size="sm"
                        onClick={() => addOnlineConsultTime(selectedDay)}
                        className="bg-accent-blue hover:bg-blue-600"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Online Slot
                      </Button>
                    </div>

                    {!data.availability?.schedule?.[selectedDay]
                      ?.onlineConsultTimes ||
                    data.availability.schedule[selectedDay].onlineConsultTimes
                      .length === 0 ? (
                      <div className="text-center py-4 text-gray-500 bg-blue-50 rounded-lg">
                        No online consultation slots scheduled
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {data.availability.schedule[
                          selectedDay
                        ].onlineConsultTimes.map(
                          (onlineSlot: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg"
                            >
                              <Badge
                                variant="secondary"
                                className="bg-accent-blue text-white"
                              >
                                Online {index + 1}
                              </Badge>
                              <div className="grid grid-cols-2 gap-2 flex-1">
                                <Input
                                  type="time"
                                  value={onlineSlot.start}
                                  onChange={(e) =>
                                    updateOnlineConsultTime(
                                      selectedDay,
                                      index,
                                      "start",
                                      e.target.value,
                                    )
                                  }
                                  className="border-gray-300 focus:border-accent-blue focus:ring-accent-blue"
                                />
                                <Input
                                  type="time"
                                  value={onlineSlot.end}
                                  onChange={(e) =>
                                    updateOnlineConsultTime(
                                      selectedDay,
                                      index,
                                      "end",
                                      e.target.value,
                                    )
                                  }
                                  className="border-gray-300 focus:border-accent-blue focus:ring-accent-blue"
                                />
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  removeOnlineConsultTime(selectedDay, index)
                                }
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-lg font-medium">Day Off</p>
                  <p className="text-sm">This day is marked as non-working</p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
