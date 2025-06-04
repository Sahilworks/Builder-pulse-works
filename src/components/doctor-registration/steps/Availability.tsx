import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Clock, Plus, X, Calendar } from "lucide-react";
import { FormData } from "../RegistrationForm";

interface AvailabilityProps {
  data: FormData;
  updateData: (section: keyof FormData, data: any) => void;
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

  const updateDaySchedule = (day: string, updates: any) => {
    const newSchedule = {
      ...data.availability.schedule,
      [day]: {
        ...data.availability.schedule[day],
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
    });
  };

  const updateWorkHours = (
    day: string,
    type: "start" | "end",
    time: string,
  ) => {
    const currentHours = data.availability.schedule[day].workHours;
    updateDaySchedule(day, {
      workHours: { ...currentHours, [type]: time },
    });
  };

  const addBreakTime = (day: string) => {
    const currentBreaks = data.availability.schedule[day].breakTimes;
    updateDaySchedule(day, {
      breakTimes: [...currentBreaks, { start: "12:00", end: "13:00" }],
    });
  };

  const updateBreakTime = (
    day: string,
    index: number,
    type: "start" | "end",
    time: string,
  ) => {
    const currentBreaks = [...data.availability.schedule[day].breakTimes];
    currentBreaks[index] = { ...currentBreaks[index], [type]: time };
    updateDaySchedule(day, { breakTimes: currentBreaks });
  };

  const removeBreakTime = (day: string, index: number) => {
    const currentBreaks = data.availability.schedule[day].breakTimes;
    updateDaySchedule(day, {
      breakTimes: currentBreaks.filter((_, i) => i !== index),
    });
  };

  const copyScheduleToAll = (sourceDay: string) => {
    const sourceSchedule = data.availability.schedule[sourceDay];
    const newSchedule = { ...data.availability.schedule };

    daysOfWeek.forEach(({ key }) => {
      if (key !== sourceDay) {
        newSchedule[key] = { ...sourceSchedule };
      }
    });

    updateData("availability", { schedule: newSchedule });
  };

  const getWorkingDaysCount = () => {
    return Object.values(data.availability.schedule).filter(
      (day) => day.isWorking,
    ).length;
  };

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="border-l-4 border-l-primary-green bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary-green" />
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
                {Object.values(data.availability.schedule)
                  .filter((day) => day.isWorking)
                  .reduce((total, day) => total + day.breakTimes.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Break Slots</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-blue">
                {Object.values(data.availability.schedule).some(
                  (day) => day.isWorking && day.workHours.start,
                )
                  ? "✓"
                  : "✗"}
              </div>
              <div className="text-sm text-gray-600">Hours Set</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-green">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Day Selection */}
      <Card className="border-l-4 border-l-secondary-green">
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
                    data.availability.schedule[key].isWorking
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
      <Card className="border-l-4 border-l-accent-blue">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-primary-text flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent-blue" />
              {daysOfWeek.find((d) => d.key === selectedDay)?.label} Schedule
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
                  checked={data.availability.schedule[selectedDay].isWorking}
                  onCheckedChange={(checked) =>
                    toggleWorkingDay(selectedDay, checked)
                  }
                />
              </div>
              {data.availability.schedule[selectedDay].isWorking && (
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

          {data.availability.schedule[selectedDay].isWorking ? (
            <div className="space-y-6">
              {/* Work Hours */}
              <div className="space-y-4">
                <h4 className="font-medium text-primary-text">Work Hours</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-600">Start Time</Label>
                    <Input
                      type="time"
                      value={
                        data.availability.schedule[selectedDay].workHours.start
                      }
                      onChange={(e) =>
                        updateWorkHours(selectedDay, "start", e.target.value)
                      }
                      className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-600">End Time</Label>
                    <Input
                      type="time"
                      value={
                        data.availability.schedule[selectedDay].workHours.end
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
                  <h4 className="font-medium text-primary-text">Break Times</h4>
                  <Button
                    size="sm"
                    onClick={() => addBreakTime(selectedDay)}
                    className="bg-primary-green hover:bg-secondary-green"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Break
                  </Button>
                </div>

                {data.availability.schedule[selectedDay].breakTimes.length ===
                0 ? (
                  <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                    No breaks scheduled for this day
                  </div>
                ) : (
                  <div className="space-y-3">
                    {data.availability.schedule[selectedDay].breakTimes.map(
                      (breakTime, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-2 flex-1">
                            <Badge
                              variant="secondary"
                              className="bg-primary-green text-white"
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
                                className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
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
                                className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
                              />
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeBreakTime(selectedDay, index)}
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

      {/* Quick Schedule Templates */}
      <Card className="border-l-4 border-l-accent-green">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4">
            Quick Schedule Templates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => {
                const template = {
                  isWorking: true,
                  workHours: { start: "09:00", end: "17:00" },
                  breakTimes: [{ start: "12:00", end: "13:00" }],
                };
                daysOfWeek.slice(0, 5).forEach(({ key }) => {
                  updateDaySchedule(key, template);
                });
                daysOfWeek.slice(5).forEach(({ key }) => {
                  updateDaySchedule(key, {
                    isWorking: false,
                    workHours: { start: "", end: "" },
                    breakTimes: [],
                  });
                });
              }}
              className="p-4 h-auto flex-col border-primary-green text-primary-green hover:bg-primary-green hover:text-white"
            >
              <div className="font-medium">Monday - Friday</div>
              <div className="text-xs text-gray-500">
                9 AM - 5 PM with lunch break
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                const template = {
                  isWorking: true,
                  workHours: { start: "08:00", end: "16:00" },
                  breakTimes: [],
                };
                daysOfWeek.forEach(({ key }) => {
                  updateDaySchedule(key, template);
                });
              }}
              className="p-4 h-auto flex-col border-secondary-green text-secondary-green hover:bg-secondary-green hover:text-white"
            >
              <div className="font-medium">7 Days a Week</div>
              <div className="text-xs text-gray-500">
                8 AM - 4 PM, no breaks
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                const template = {
                  isWorking: true,
                  workHours: { start: "10:00", end: "18:00" },
                  breakTimes: [
                    { start: "13:00", end: "14:00" },
                    { start: "16:00", end: "16:15" },
                  ],
                };
                daysOfWeek.slice(0, 6).forEach(({ key }) => {
                  updateDaySchedule(key, template);
                });
                updateDaySchedule("sunday", {
                  isWorking: false,
                  workHours: { start: "", end: "" },
                  breakTimes: [],
                });
              }}
              className="p-4 h-auto flex-col border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white"
            >
              <div className="font-medium">Monday - Saturday</div>
              <div className="text-xs text-gray-500">
                10 AM - 6 PM with breaks
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
