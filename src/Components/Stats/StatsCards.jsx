import { CheckCircle, Circle, AlertCircle, Calendar } from 'lucide-react';

export default function StatsCards({ stats, darkMode }) {
    const cards = [
        {
            label: 'Total',
            value: stats.total,
            icon: Circle,
            color: darkMode ? 'text-white' : 'text-gray-900',
            bgColor: 'from-blue-500 to-cyan-500'
        },
        {
            label: 'Actives',
            value: stats.active,
            icon: Circle,
            color: 'text-blue-400',
            bgColor: 'from-blue-500 to-blue-600'
        },
        {
            label: 'Terminées',
            value: stats.completed,
            icon: CheckCircle,
            color: 'text-green-400',
            bgColor: 'from-green-500 to-emerald-600'
        },
        {
            label: "Aujourd'hui",
            value: stats.today,
            icon: Calendar,
            color: 'text-purple-400',
            bgColor: 'from-purple-500 to-pink-500'
        },
        {
            label: 'En retard',
            value: stats.overdue,
            icon: AlertCircle,
            color: 'text-red-400',
            bgColor: 'from-red-500 to-orange-500'
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {cards.map((card, index) => {
                const Icon = card.icon;
                return (
                    <div
                        key={index}
                        className={`p-4 rounded-xl backdrop-blur-lg ${darkMode ? 'bg-white/10' : 'bg-white/70'
                            } shadow-lg border ${darkMode ? 'border-white/20' : 'border-purple-200'
                            } hover:scale-105 transition-transform cursor-pointer`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <Icon size={20} className={card.color} />
                            <div className={`text-2xl font-bold ${card.color}`}>
                                {card.value}
                            </div>
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                            {card.label}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}