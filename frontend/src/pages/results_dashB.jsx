

import { useContext } from "react"
import { DataContext } from "./dataProvider"
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";


import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  "Low Risk": "#22c55e",
  "Medium Risk": "#eab308",
  "High Risk": "#ef4444",
  "Very High Risk": "#991b1b",
};

export default function Output() {

    const {output,summary={},students=[]}=useContext(DataContext)
    const naviagte = useNavigate()
    useEffect(()=>{
        if(!summary || !students){
            naviagte('/')
        }
    },[summary,students,naviagte])

    if(!summary || !students){
        return null
    }

    function downloadCSV(students) {
  if (!students || students.length === 0) return;

  const headers = Object.keys(students[0]);

  const rows = students.map(student =>
    headers.map(h => JSON.stringify(student[h] ?? "")).join(",")
  );

  const csvContent = [
    headers.join(","),
    ...rows
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "attendance_risk_results.csv";
  a.click();

  window.URL.revokeObjectURL(url);
}

     if (!Object.keys(summary).length) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-300 flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }


   const pieData = Object.entries(summary).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <div class="flex justify-between items-center">
            <h1 className="text-3xl font-bold mb-6">
            📊 Attendance Anomaly Dashboard
            </h1>
            <button
                onClick={() => downloadCSV(students)}
                 className="bg-green-500 text-slate-950 hover:bg-amber-600  px-4 py-2 rounded-lg text-sm font-semibold"
                   >
                   Download CSV
            </button>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.keys(summary).map((key) => (
          <div
            key={key}
            className="bg-slate-800 rounded-xl p-4 border-l-4"
            style={{ borderColor: COLORS[key] }}
          >
            <p className="text-sm text-slate-400">{key}</p>
            <p className="text-3xl font-bold">{summary[key]}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Pie Chart */}
        <div className="bg-slate-800 rounded-xl p-4">
          <h2 className="mb-4 font-semibold">Risk Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={120}
                label
              >
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* bar chart */}
        <div className="bg-slate-800 rounded-xl p-4">
          <h2 className="mb-4 font-semibold">Students by Risk Level</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pieData}>
              <XAxis dataKey="name" stroke="#cbd5f5" />
              <YAxis stroke="#cbd5f5" />
              <Tooltip />
              <Bar dataKey="value">
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={COLORS[entry.name]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

 
      <div className="bg-slate-800 rounded-xl p-4 mt-8">
        <h2 className="mb-4 font-semibold">Student Risk Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-700 text-slate-300">
              <tr>
                <th className="p-3 text-left">Student ID</th>
                <th className="p-3 text-left">Risk</th>
                <th className="p-3 text-left">Attendance</th>
                <th className="p-3 text-left">Absence Streak</th>
                <th className="p-3 text-left">Trend</th>
                <th className="p-3 text-left">Suggested Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr
                  key={s.student_id}
                  className="border-b border-slate-700 hover:bg-slate-700/50"
                >
                  <td className="p-3">{s.student_id}</td>
                  <td
                    className="p-3 font-semibold"
                    style={{ color: COLORS[s.risk_label] }}
                  >
                    {s.risk_label}
                  </td>
                  <td className="p-3">
                    {Math.round(s.attendance_ratio * 100)}%
                  </td>
                  <td className="p-3">{s.consecutive_absent_days}</td>
                  <td className="p-3">
                    {s.attendance_change < 0 ? "⬇ Declining" : "⬆ Stable"}
                  </td>
                  <td className="p-3">
                    {getAction(s.risk_label)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function getAction(risk) {
  switch (risk) {
    case "Low Risk":
      return "No action required";
    case "Medium Risk":
      return "Send reminder";
    case "High Risk":
      return "Contact student";
    case "Very High Risk":
      return "Escalate to admin";
    default:
      return "-";
  }
}
