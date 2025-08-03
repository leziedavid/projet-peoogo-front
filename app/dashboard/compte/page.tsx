"use client";

import React from "react";
import { fakeWallet, fakeTransactions, fakeOrders, fakeTrips } from "../../../types/fakeDashboardData";
import { LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,} from "recharts";
import { Clock, Bookmark, Users, Play, Store, UserPlus, FileText, Calendar,ChevronDown,LucideIcon, Flame, Send, Heart, Eye} from "lucide-react"
import DashboardGrid from "@/components/dash/dashboard-grid";
import { Tableau } from "@/components/dash/tableau";
import { useOrderSocket } from '@/lib/socket/useOrderSocket';

function Cards({ children }: { children: React.ReactNode }) {

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      {children}
    </div>
  );
}

interface DashboardItem {
  icon: LucideIcon
  title: string
  count: number
  iconColor: string
  bgColor: string
}

export default function DashboardPage() {

  useOrderSocket() // ← Active les sockets seulement ici
  
  // Trier les transactions par date croissante
  const sortedTxns = [...fakeTransactions].sort(
    (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
  );

  // Construire un solde cumulé pour le graphique
  let cumulativeBalance = 0;
  const dataForGraph = sortedTxns.map((txn) => {
    cumulativeBalance += txn.amount;
    return {
      date: txn.createdAt.toLocaleDateString("fr-FR"),
      balance: cumulativeBalance / 100, // centimes -> unité
    };
  });

  // Données d'exemple - vous pouvez les remplacer par vos vraies données
  const dashboardData: DashboardItem[] = [
    {
      icon: Clock,
      title: "Souvenirs",
      count: 1247,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Bookmark,
      title: "Enregistrements",
      count: 89,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: Users,
      title: "Groupes",
      count: 23,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Play,
      title: "Reels",
      count: 156,
      iconColor: "text-teal-600",
      bgColor: "bg-teal-100"
    },
    {
      icon: Store,
      title: "Marketplace",
      count: 45,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: UserPlus,
      title: "Ami(e)s",
      count: 342,
      iconColor: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: FileText,
      title: "Fils",
      count: 789,
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-100"
    },
    {
      icon: Calendar,
      title: "Évènements",
      count: 12,
      iconColor: "text-red-600",
      bgColor: "bg-red-100"
    }
  ]

  return (

    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>

            <Tableau/>

          {/* Dernières commandes */}
          {/* <Cards>
            <h2 className="text-xl font-semibold mb-2">Dernières commandes</h2>
            <table className="w-full text-left border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-2 py-1">ID</th>
                  <th className="border border-gray-300 px-2 py-1">Montant</th>
                  <th className="border border-gray-300 px-2 py-1">Statut</th>
                  <th className="border border-gray-300 px-2 py-1">Date</th>
                </tr>
              </thead>
              <tbody>
                {fakeOrders.map((order) => (
                  <tr key={order.id} className="border border-gray-300">
                    <td className="border border-gray-300 px-2 py-1">{order.id}</td>
                    <td className="border border-gray-300 px-2 py-1">
                      {((order.amount ?? 0) / 100).toLocaleString("fr-FR", {
                        style: "currency",
                        currency: "XOF",
                      })}
                    </td>
                    <td className="border border-gray-300 px-2 py-1">{order.status}</td>
                    <td className="border border-gray-300 px-2 py-1">
                      {order.createdAt.toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Cards> */}

          {/* Graphique d’évolution du solde */}
          {/* <Cards>
            <h2 className="text-xl font-semibold mb-2">Évolution du solde</h2>
            <div style={{ width: "100%", height: 250 }}>
              <ResponsiveContainer>
                <LineChart data={dataForGraph}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => `${value.toFixed(2)} XOF`}
                    labelFormatter={(label) => `Date : ${label}`}
                  />
                  <Line type="monotone" dataKey="balance" stroke="#10B981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Cards> */}

          {/* Liste des trajets récents */}
          <Cards>
            <h2 className="text-xl font-semibold mb-2">Trajets récents</h2>
            <ul>
              {fakeTrips.map((trip) => (
                <li key={trip.id} className="border-b py-2">
                  <p>
                    <strong>{trip.departure}</strong> → <strong>{trip.arrival}</strong>
                  </p>
                  <p>
                    Date : {trip.date.toLocaleDateString("fr-FR")} | Places disponibles : {trip.availableSeats}
                  </p>
                  <p>
                    Prix : {(trip.price ?? 0).toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "XOF",
                    })}
                  </p>
                  <p>Status : {trip.status}</p>
                </li>
              ))}
            </ul>
          </Cards>


    </div>

    );
}


