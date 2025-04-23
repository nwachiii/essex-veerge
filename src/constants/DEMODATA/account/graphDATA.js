export const demoGraphData = {
  1: {
    card_data: {
      // Scaled down significantly for a weekly view
      totalInflow: {
        amount: 17500000.0, // Approx 920M / 52
        changePercent: '0.8', // Slightly different change %
        changeDirection: 'up',
      },
      totalProcessedTransactions: {
        amount: 15300000.0, // Approx 800M / 52
        changePercent: '1.0',
        changeDirection: 'up',
      },
      unprocessedTransactions: {
        amount: 9800000.0, // Approx 510M / 52
      },
      outstandingBalance: {
        amount: 13000000.0, // Approx 680M / 52
        changePercent: '0.1',
        changeDirection: 'down',
      },
    },
    graph_data: [
      // Graph data values reflect millions per day
      {name: 'Mon', data: {credit: 1000000.0, debit: 2500000.0}},
      {name: 'Tue', data: {credit: 500000.0, debit: 1800000.0}},
      {name: 'Wed', data: {credit: 1200000.0, debit: 2200000.0}},
      {name: 'Thur', data: {credit: 800000.0, debit: 2000000.0}},
      {name: 'Fri', data: {credit: 1500000.0, debit: 3000000.0}},
      {name: 'Sat', data: {credit: 300000.0, debit: 1500000.0}},
      {name: 'Sun', data: {credit: 200000.0, debit: 1300000.0}},
    ],
  },
  2: {
    card_data: {
      // Scaled for a monthly view (approx Yearly / 12)
      totalInflow: {
        amount: 76500000.0, // Approx 920M / 12
        changePercent: '1.5',
        changeDirection: 'up',
      },
      totalProcessedTransactions: {
        amount: 66000000.0, // Approx 800M / 12
        changePercent: '1.8',
        changeDirection: 'up',
      },
      unprocessedTransactions: {
        amount: 42000000.0, // Approx 510M / 12
      },
      outstandingBalance: {
        amount: 56500000.0, // Approx 680M / 12
        changePercent: '0.3',
        changeDirection: 'down',
      },
    },
    graph_data: [
      // Graph data values reflect tens of millions per week range
      {name: 'Apr 1 - Apr 7', data: {credit: 10000000.0, debit: 15000000.0}},
      {name: 'Apr 8 - Apr 14', data: {credit: 8000000.0, debit: 18000000.0}},
      {name: 'Apr 15 - Apr 21', data: {credit: 12000000.0, debit: 16000000.0}},
      {name: 'Apr 22 - Apr 28', data: {credit: 9000000.0, debit: 17000000.0}},
    ],
  },
  3: {
    card_data: {
      // Using the original large numbers for yearly total
      totalInflow: {
        amount: 920000000.0,
        changePercent: '2.5',
        changeDirection: 'up',
      },
      totalProcessedTransactions: {
        amount: 800000000.0,
        changePercent: '2.5',
        changeDirection: 'up',
      },
      unprocessedTransactions: {
        amount: 510540000.0,
      },
      outstandingBalance: {
        amount: 680000000.0,
        changePercent: '0.5',
        changeDirection: 'down',
      },
    },
    graph_data: [
      // Graph data values reflect tens/hundreds of millions per month
      {name: 'May', data: {credit: 30000000.0, debit: 70000000.0}}, // Scaled up previous values
      {name: 'Jun', data: {credit: 25000000.0, debit: 65000000.0}},
      {name: 'Jul', data: {credit: 35000000.0, debit: 75000000.0}},
      {name: 'Aug', data: {credit: 28000000.0, debit: 68000000.0}},
      {name: 'Sep', data: {credit: 32000000.0, debit: 72000000.0}},
      {name: 'Oct', data: {credit: 40000000.0, debit: 80000000.0}},
      {name: 'Nov', data: {credit: 38000000.0, debit: 78000000.0}},
      {name: 'Dec', data: {credit: 45000000.0, debit: 90000000.0}},
      {name: 'Jan', data: {credit: 29000000.0, debit: 69000000.0}},
      {name: 'Feb', data: {credit: 25000000.0, debit: 62000000.0}},
      {name: 'Mar', data: {credit: 31000000.0, debit: 71000000.0}},
      {name: 'Apr', data: {credit: 37000000.0, debit: 76000000.0}},
    ],
  },
};
