/* Application logic exported from VietPay MMS Responsive.dc.html. */
(function () {
  function applicationSource() {

class Component extends DCLogic {
  constructor(props) {
    super(props);
    const previewParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
    const previewPage = previewParams.get('page');
    const initialApps = this.seedApps();
    const detailPages = ['application', 'application-review', 'approval-review'];
    const initialAppId = detailPages.includes(previewPage) ? (previewParams.get('application') || 'APP-2601') : null;
    const initialApp = initialAppId ? initialApps.find(x => x.id === initialAppId) : null;
    const previewEntity = previewParams.get('entity');
    const initialAppSrc = previewEntity === 'pvcb' ? 'PVCOM' : previewEntity === 'vietpay' ? 'VIETPAY' : 'all';
    const previewPages = {
      overview: 'overview',
      businesses: 'businesses',
      'business-detail': 'detail',
      map: 'map',
      network: 'network',
      commission: 'commission',
      'commission-detail': 'commissionDetail',
      transactions: 'txns',
      payouts: 'payouts',
      invoices: 'invoices',
      downloads: 'downloads',
      staff: 'staff',
      revenue: 'revenue',
      'iso-logs': 'isoLogs',
      apps: 'apps',
      application: 'appDetail',
      'application-review': 'appDetail',
      approvals: 'approvals',
      'approval-review': 'approvalDetail'
    };
    const initialPage = previewPages[previewPage] || 'overview';
    this.state = {
      page: initialPage, detailId: initialPage === 'detail' ? 'm0' : null, filtersOpen: false, tab: 'all', search: '',
      currentUser: { name: 'Duy Nguyen', initials: 'DN', id: 'DN234@pvcb.com' },
      lang: 'en', notifOpen: false, profileOpen: false, modal: null, reason: '', reasonError: false,
      loadState: 'ready', mapMode: 'location', mapSource: 'All sources', mapRegion: null,
      range: 'month', rangeOpen: false, rangeFrom: '2026-01-01', rangeTo: '2026-01-31',
      drawer: null, drawerSearch: '', drawerSource: 'All sources', drawerRegion: 'All regions', drawerPage: 0,
      appSrc: initialAppSrc, appTab: 'all', appSearch: '', appId: initialPage === 'appDetail' ? initialAppId : null, draftApp: initialPage === 'appDetail' && initialApp ? Object.assign({}, initialApp) : null, apps: initialApps, navOpen: false,
      appPage: 0, appPer: 10,
      txnSrc: 'all', txnTab: 'authorized', txnSearch: '', txnPage: 0, txnPer: 8,
      txnFiltersOpen: false, txnColsOpen: false, txnView: null,
      payouts: this.seedPayouts(), poSrc: 'all', poSearch: '', poPage: 0, poPer: 10,
      poFiltersOpen: false, poColsOpen: false, poExportOpen: false, poView: null,
      poSel: {}, poState: 'ready', poSort: 'pdate', poDir: 'desc',
      poCols: { entity: true, period: true, sdate: false, count: false, gross: true, fees: true, other: false, bank: true, account: false, holder: false, bankref: true },
      poFilters: this.blankPo(), poDraftPo: this.blankPo(),
      txnFilters: this.blankTxn(), txnDraftF: this.blankTxn(),
      txnCols: { txn: true, order: true, mid: true, card: true, auth: true, terminal: false, channel: false },
      txnSx: 0, txnScrollW: 1, txnClientW: 1,
      apvId: initialPage === 'approvalDetail' ? initialAppId : null, apvSrc: 'all', apvTab: 'all', apvSearch: '',
      apvFilters: this.blankApv(), apvDraftF: this.blankApv(), apvFiltersOpen: false,
      apvCols: { customer: true, ekyc: true, kyb: true, maker: true, checker: true, submitted: true, updated: true, reason: true },
      apvColsOpen: false, apvSort: 'submitted', apvDirDesc: true, apvPage: 0, apvPer: 10, apvExpand: null,
      docView: null, rcOpen: false, rcSel: {}, rcNote: '', rcError: false,
      notifications: [
        { id: 'n1', title: 'New merchant application', body: 'Saigon Coffee Roasters submitted an application for review.', ts: 'Today, 09:12', read: false },
        { id: 'n2', title: 'KYC completed', body: 'Bhavya Stores & Bakery finished KYC/KYB verification.', ts: 'Today, 08:40', read: false },
        { id: 'n3', title: 'Documents updated after submission', body: 'Nha Trang Dive Center replaced the business licence (v2) — APP-2607 needs re-review.', ts: 'Today, 08:05', read: false },
        { id: 'n4', title: 'New account created', body: 'Sapa Mountain Lodge created a merchant account from the VietPay App.', ts: 'Today, 07:30', read: false },
        { id: 'n5', title: 'KYB completed', body: 'Cho Lon Wholesale Foods passed KYB verification — APP-2601 is ready for approval.', ts: 'Yesterday, 10:05', read: true },
        { id: 'n6', title: 'Assigned to checker', body: 'APP-2601 was assigned to Duy Nguyen for review.', ts: 'Yesterday, 11:00', read: true },
        { id: 'n7', title: 'Changes requested', body: 'Hue Heritage Tours — business activities (VI) and an updated licence are required.', ts: 'Yesterday, 15:20', read: true },
        { id: 'n8', title: 'Payment Link enabled', body: 'Minh Chau Pharmacy enabled Payment Link on SoundBox S20.', ts: 'Yesterday, 16:20', read: true }
      ],
      sortKey: 'date', sortDir: 'desc', toast: null, linkDraft: null,
      filters: this.blankFilters(), draft: this.blankFilters(),
      merchants: this.seed(),
      hostW: typeof window !== 'undefined' ? Math.max(320, window.innerWidth) : 1440,
      railForced: false,
      commissionView: 'graph', commissionPartner: 'all', commissionRange: '30d', dashboardEntity: 'ALL', revenueEntity: 'ALL', revenueStatus: 'All', revenueFrom: '', revenueTo: '', isoSearch: '', isoStatus: 'All',
      staffSelected: 'stf-001', staffPermissions: { 'stf-001': { transactions: true, payouts: true, invoices: true, downloads: true, approvals: true, commission: false }, 'stf-002': { transactions: true, payouts: false, invoices: false, downloads: true, approvals: true, commission: false }, 'stf-003': { transactions: true, payouts: true, invoices: true, downloads: true, approvals: false, commission: true } },
      staffAudit: [{ ts: '12 Sep 2026, 14:10', editor: 'Duy Nguyen', user: 'Linh Tran', change: 'Updated approvals permission: disabled → enabled' }]
    };
    this.state.networkNodes = this.seedNetwork();
    window.MMSFinance.init(this);
    if (['invoices','downloads'].includes(previewPage)) this.state.page = previewPage;
  }
  seedNetwork() {
    return [
      { id: 'partner-vp', kind: 'Partner', name: 'VietPay Direct', code: 'VP-DIRECT', parent: null, merchants: 6, commission: 18450000, status: 'ACTIVE', children: ['partner-south', 'partner-central'] },
      { id: 'partner-south', kind: 'Partner', name: 'Southern Growth Partner', code: 'PT-SOUTH-01', parent: 'partner-vp', merchants: 3, commission: 8420000, status: 'ACTIVE', children: ['merchant-cho-lon', 'merchant-bien-hoa'] },
      { id: 'partner-central', kind: 'Partner', name: 'Central Vietnam Partner', code: 'PT-CENTRAL-01', parent: 'partner-vp', merchants: 3, commission: 10030000, status: 'ACTIVE', children: ['merchant-sapa', 'merchant-danang'] },
      { id: 'merchant-cho-lon', kind: 'Merchant', name: 'Cho Lon Wholesale Foods', code: 'MID-100234', parent: 'partner-south', merchants: 1, commission: 3200000, status: 'ACTIVE', children: [] },
      { id: 'merchant-bien-hoa', kind: 'Merchant', name: 'Bien Hoa Auto Service', code: 'MID-101377', parent: 'partner-south', merchants: 1, commission: 2860000, status: 'ACTIVE', children: [] },
      { id: 'merchant-sapa', kind: 'Merchant', name: 'Sapa Mountain Lodge', code: 'MID-100812', parent: 'partner-central', merchants: 1, commission: 4180000, status: 'ACTIVE', children: [] },
      { id: 'merchant-danang', kind: 'Merchant', name: 'Da Nang Seafood Market', code: 'MID-100933', parent: 'partner-central', merchants: 1, commission: 5850000, status: 'PENDING', children: [] }
    ];
  }
  seedCommission() {
    return [
      { id: 'partner-vp', partner: 'VietPay Direct', mid: 'VP-DIRECT', merchants: 6, transactionFee: 18450000, rentalFee: 0, lifetime: 186240000, balance: 42850000, status: 'ACTIVE' },
      { id: 'partner-south', partner: 'Southern Growth Partner', mid: 'PT-SOUTH-01', merchants: 3, transactionFee: 8420000, rentalFee: 1200000, lifetime: 93200000, balance: 18750000, status: 'ACTIVE' },
      { id: 'partner-central', partner: 'Central Vietnam Partner', mid: 'PT-CENTRAL-01', merchants: 3, transactionFee: 10030000, rentalFee: 800000, lifetime: 108400000, balance: 22400000, status: 'ACTIVE' }
    ];
  }
  blankTxn() {
    return { from: '', to: '', method: 'All', paymentType: 'All', merchant: 'All', service: 'All', deviceId: '', source: 'All', min: '', max: '', mcc: 'All' };
  }
  txnRegistrations() {
    const merchants = [
      ['Cho Lon Wholesale Foods', 'VIETPAY', 'MID-100234', 'T-8841'],
      ['HKD CAFE 123', 'PVCOM', 'MID-100567', 'T-2210'],
      ['Sapa Mountain Lodge', 'VIETPAY', 'MID-100812', 'T-5590'],
      ['Da Nang Seafood Market', 'PVCOM', 'MID-100933', 'T-7712'],
      ['Vinh Long Agri Supply', 'VIETPAY', 'MID-101045', 'T-3320'],
      ['Hoan Kiem Market', 'PVCOM', 'MID-101190', 'T-9014'],
      ['Hanoi Silk Atelier', 'VIETPAY', 'MID-101288', 'T-4488'],
      ['Bien Hoa Auto Service', 'PVCOM', 'MID-101377', 'T-6602']
    ];
    return merchants.map((m, i) => ({
      mid: m[2], name: m[0], source: m[1],
      services: i % 4 === 3 ? ['SoundBox S20'] : i % 2 === 0 ? ['POS', 'Payment Link'] : ['Payment Link'],
      devices: i % 4 === 3 ? [{ id: m[3], service: 'SoundBox S20' }] : i % 2 === 0 ? [{ id: m[3], service: 'POS' }] : []
    })).concat([
      { mid: 'MID-NEW001', name: 'Lotus Grocery', source: 'VIETPAY', services: [], devices: [] },
      { mid: 'MID-NEW002', name: 'River Cafe', source: 'PVCOM', services: ['SoundBox S20'], devices: [] }
    ]);
  }
  seedTxns() {
    const M = this.txnRegistrations().slice(0, 8).map(m => [m.name, m.source, m.mid, m.devices.length ? m.devices[0].id : '—']);
    const methods = ['visa', 'mc', 'napas', 'qr'];
    const rows = [];
    const amounts = [159000, 89000, 1250000, 340500, 675000, 220000, 45000, 980000, 128000, 2450000, 76500, 310000, 55000, 1890000, 240000, 99000, 430000, 1150000, 68000, 520000, 87500, 1620000, 205000, 39000, 745000, 112000];
    const times = ['10:15', '09:52', '09:40', '18:22', '16:05', '14:47', '11:30', '20:10', '08:25', '13:02', '17:44', '19:18', '07:55', '12:36', '15:20', '21:05', '10:48', '16:59', '09:11', '18:40', '11:52', '14:14', '20:33', '08:47', '13:29', '17:07'];
    const days = ['2026-01-21', '2026-01-21', '2026-01-21', '2026-01-20', '2026-01-20', '2026-01-20', '2026-01-20', '2026-01-19', '2026-01-19', '2026-01-19', '2026-01-19', '2026-01-18', '2026-01-18', '2026-01-18', '2026-01-17', '2026-01-17', '2026-01-17', '2026-01-16', '2026-01-16', '2026-01-16', '2026-01-15', '2026-01-15', '2026-01-15', '2026-01-14', '2026-01-14', '2026-01-14'];
    const statuses = ['AUTHORIZED', 'AUTHORIZED', 'AUTHORIZED', 'AUTHORIZED', 'AUTHORIZED', 'AUTHORIZED', 'AUTHORIZED', 'AUTHORIZED', 'SETTLED', 'SETTLED', 'SETTLED', 'SETTLED', 'SETTLED', 'SETTLED', 'REFUNDED', 'REFUNDED', 'REFUNDED', 'FAILED', 'FAILED', 'FAILED', 'AUTHORIZED', 'SETTLED', 'AUTHORIZED', 'FAILED', 'SETTLED', 'REFUNDED'];
    const fails = ['Insufficient funds', 'Do not honour — issuer declined', '3-D Secure authentication failed'];
    const cards = ['4242', '5588', '1120', '7734', '9012', '3399', '6601', '2280', '8845', '1907', '5023', '7761', '4410', '9938', '2154', '6677', '3081', '5542', '8829', '1163', '7005', '4472', '9310', '2698', '6134', '8507'];
    for (let i = 0; i < 26; i++) {
      const m = M[i % M.length];
      const st2 = statuses[i];
      const method = methods[i % methods.length];
      rows.push({
        id: 'TXN-88234' + (10 + i), order: 'ORD-552' + (10 + i), mid: m[2],
        merchant: m[0], source: m[1], method,
        amount: amounts[i], status: st2, date: days[i], time: times[i],
        card: method === 'qr' ? '' : cards[i], auth: method === 'qr' || st2 === 'FAILED' ? '—' : 'AUTH-' + (i + 1) + 'F2A' + (i % 9),
        terminal: method === 'qr' || i % 2 === 0 ? m[3] : '—', channel: method === 'qr' ? 'SoundBox S20' : (i % 2 === 0 ? 'POS' : 'Payment Link'),
        reason: st2 === 'FAILED' ? fails[i % 3] : '',
        settled: st2 === 'SETTLED' || st2 === 'REFUNDED' ? days[i] : ''
      });
    }
    return rows;
  }
  blankPo() {
    return { pFrom: '', pTo: '', sFrom: '', sTo: '', merchant: '', entity: 'All', status: 'All', min: '', max: '', bank: 'All', channel: 'All', sortBy: 'pdate', dir: 'desc' };
  }
  fmtDong(n) {
    const s2 = String(Math.round(Math.abs(n))), out = [];
    for (let i = 0; i < s2.length; i++) {
      if (i > 0 && (s2.length - i) % 3 === 0) out.push('.');
      out.push(s2[i]);
    }
    return (n < 0 ? '-' : '') + out.join('') + ' \u20ab';
  }
  seedPayouts() {
    const mk = (o) => Object.assign({
      refundAdj: 0, otherAdj: 0, channels: 'Card 62% \u00b7 QR 28% \u00b7 E-commerce 10%',
      created: '20 Aug 2026, 06:05', updated: '20 Aug 2026, 16:31', failReason: ''
    }, o);
    return [
      mk({ id: 'PAY-20260820-001284', merchant: 'An Khang Pharmacy', mid: 'VP0001284', entity: 'VIETPAY', period: '19\u201320 Aug 2026', sdate: '2026-08-20', count: 412, gross: 128450000, fees: 2569000, net: 125881000, pdate: '2026-08-20', ptime: '16:30', bank: 'PVcomBank', account: '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 4821', holder: 'CTY TNHH AN KHANG', bankRef: 'PVCB2608201284', status: 'COMPLETED', settlementId: 'STL-20260820-4471' }),
      mk({ id: 'PAY-20260820-001283', merchant: 'Minh Phat Electronics', mid: 'PV0009821', entity: 'PVCOM', period: '19\u201320 Aug 2026', sdate: '2026-08-20', count: 268, gross: 86320000, fees: 1726400, net: 84593600, pdate: '2026-08-20', ptime: '16:30', bank: 'PVcomBank', account: '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 7710', holder: 'CTY CP MINH PHAT', bankRef: 'PVCB2608201283', status: 'PROCESSING', settlementId: 'STL-20260820-4472', channels: 'Card 48% \u00b7 QR 41% \u00b7 E-commerce 11%' }),
      mk({ id: 'PAY-20260820-001282', merchant: 'Cho Lon Wholesale Foods', mid: 'VP0001277', entity: 'VIETPAY', period: '19 Aug 2026', sdate: '2026-08-19', count: 154, gross: 54700000, fees: 1094000, net: 53606000, pdate: '2026-08-20', ptime: '15:00', bank: 'Vietcombank', account: '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 1908', holder: 'HKD CHO LON', bankRef: '\u2014', status: 'PENDING', settlementId: 'STL-20260819-4468', channels: 'Card 35% \u00b7 QR 55% \u00b7 Cash 10%' }),
      mk({ id: 'PAY-20260819-001275', merchant: 'Green Life Mart', mid: 'PV0009814', entity: 'PVCOM', period: '18\u201319 Aug 2026', sdate: '2026-08-19', count: 331, gross: 72100000, fees: 1442000, net: 70658000, pdate: '2026-08-19', ptime: '16:30', bank: 'BIDV', account: '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 3062', holder: 'CTY TNHH GREEN LIFE', bankRef: 'BIDV1908261275', status: 'FAILED', settlementId: 'STL-20260819-4465', failReason: 'Beneficiary account name does not match the registered account holder. Update the bank details and request a re-run.', created: '19 Aug 2026, 06:05', updated: '19 Aug 2026, 17:02' }),
      mk({ id: 'PAY-20260819-001274', merchant: 'Sunrise Coffee Roasters', mid: 'VP0001262', entity: 'VIETPAY', period: '18\u201319 Aug 2026', sdate: '2026-08-19', count: 205, gross: 41260000, fees: 825200, refundAdj: 1200000, net: 39234800, pdate: '2026-08-19', ptime: '16:30', bank: 'Techcombank', account: '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 5514', holder: 'CTY TNHH SUNRISE', bankRef: 'TCB1908261274', status: 'COMPLETED', settlementId: 'STL-20260819-4466', channels: 'Card 58% \u00b7 QR 34% \u00b7 Cash 8%', created: '19 Aug 2026, 06:05', updated: '19 Aug 2026, 16:38' }),
      mk({ id: 'PAY-20260819-001271', merchant: 'Hoa Sen Home Decor', mid: 'PV0009802', entity: 'PVCOM', period: '18 Aug 2026', sdate: '2026-08-18', count: 96, gross: 33900000, fees: 678000, net: 33222000, pdate: '2026-08-19', ptime: '15:00', bank: 'PVcomBank', account: '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 8890', holder: 'CTY CP HOA SEN', bankRef: 'PVCB1908261271', status: 'COMPLETED', settlementId: 'STL-20260818-4461', created: '19 Aug 2026, 06:05', updated: '19 Aug 2026, 15:12' }),
      mk({ id: 'PAY-20260818-001266', merchant: 'Bao Long Petrol Station', mid: 'VP0001248', entity: 'VIETPAY', period: '17\u201318 Aug 2026', sdate: '2026-08-18', count: 588, gross: 214800000, fees: 4296000, otherAdj: -540000, net: 209964000, pdate: '2026-08-18', ptime: '16:30', bank: 'Vietcombank', account: '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 2277', holder: 'CTY TNHH BAO LONG', bankRef: 'VCB1808261266', status: 'COMPLETED', settlementId: 'STL-20260818-4459', channels: 'Card 74% \u00b7 QR 21% \u00b7 Cash 5%', created: '18 Aug 2026, 06:05', updated: '18 Aug 2026, 16:44' }),
      mk({ id: 'PAY-20260818-001263', merchant: 'Thanh Binh Bookstore', mid: 'PV0009795', entity: 'PVCOM', period: '17 Aug 2026', sdate: '2026-08-17', count: 74, gross: 18450000, fees: 369000, net: 18081000, pdate: '2026-08-18', ptime: '15:00', bank: 'ACB', account: '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 4109', holder: 'HKD THANH BINH', bankRef: 'ACB1808261263', status: 'COMPLETED', settlementId: 'STL-20260817-4452', channels: 'Card 41% \u00b7 QR 49% \u00b7 Cash 10%', created: '18 Aug 2026, 06:05', updated: '18 Aug 2026, 15:09' }),
      mk({ id: 'PAY-20260817-001259', merchant: 'Sao Mai Dental Clinic', mid: 'VP0001235', entity: 'VIETPAY', period: '16\u201317 Aug 2026', sdate: '2026-08-17', count: 118, gross: 96700000, fees: 1934000, net: 94766000, pdate: '2026-08-17', ptime: '16:30', bank: 'Techcombank', account: '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 6033', holder: 'CTY TNHH SAO MAI', bankRef: 'TCB1708261259', status: 'COMPLETED', settlementId: 'STL-20260817-4450', channels: 'Card 81% \u00b7 E-commerce 19%', created: '17 Aug 2026, 06:05', updated: '17 Aug 2026, 16:36' }),
      mk({ id: 'PAY-20260817-001255', merchant: 'Viet Tien Fashion', mid: 'PV0009781', entity: 'PVCOM', period: '16\u201317 Aug 2026', sdate: '2026-08-17', count: 402, gross: 63150000, fees: 1263000, refundAdj: 2850000, net: 59037000, pdate: '2026-08-17', ptime: '16:30', bank: 'BIDV', account: '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 9924', holder: 'CTY CP VIET TIEN', bankRef: 'BIDV1708261255', status: 'PROCESSING', settlementId: 'STL-20260817-4448', channels: 'Card 44% \u00b7 E-commerce 46% \u00b7 QR 10%', created: '17 Aug 2026, 06:05', updated: '17 Aug 2026, 16:33' }),
      mk({ id: 'PAY-20260816-001248', merchant: 'Nam Long Hardware', mid: 'VP0001221', entity: 'VIETPAY', period: '15\u201316 Aug 2026', sdate: '2026-08-16', count: 143, gross: 47800000, fees: 956000, net: 46844000, pdate: '2026-08-16', ptime: '15:00', bank: 'Vietcombank', account: '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 7145', holder: 'HKD NAM LONG', bankRef: 'VCB1608261248', status: 'PENDING', settlementId: 'STL-20260816-4441', channels: 'Card 52% \u00b7 QR 33% \u00b7 Cash 15%', created: '16 Aug 2026, 06:05', updated: '16 Aug 2026, 15:04' }),
      mk({ id: 'PAY-20260816-001244', merchant: 'Phu Quy Jewellery', mid: 'PV0009770', entity: 'PVCOM', period: '15 Aug 2026', sdate: '2026-08-15', count: 37, gross: 158900000, fees: 3178000, net: 155722000, pdate: '2026-08-16', ptime: '16:30', bank: 'ACB', account: '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 3388', holder: 'CTY TNHH PHU QUY', bankRef: '\u2014', status: 'FAILED', settlementId: 'STL-20260815-4436', failReason: 'Destination bank rejected the transfer \u2014 daily credit limit exceeded on the beneficiary account.', channels: 'Card 88% \u00b7 QR 12%', created: '16 Aug 2026, 06:05', updated: '16 Aug 2026, 17:20' })
    ];
  }
  fmtVnd(n) {
    const s2 = String(Math.round(n)), out = [];
    for (let i = 0; i < s2.length; i++) {
      if (i > 0 && (s2.length - i) % 3 === 0) out.push(',');
      out.push(s2[i]);
    }
    return out.join('') + ' VNĐ';
  }
  blankApv() {
    return { from: '', to: '', customerType: 'All', source: 'All', ekyc: 'All', kyb: 'All', status: 'All', maker: 'All', checker: 'All' };
  }
  mccName(code) {
    const M = { '5411': 'Grocery stores & supermarkets', '5651': 'Family clothing stores', '4722': 'Travel agencies & tour operators', '7538': 'Automotive service & repair shops', '5199': 'Nondurable goods wholesale', '7999': 'Recreation services', '7011': 'Hotels, motels & resorts', '5814': 'Fast food restaurants', '5812': 'Eating places & restaurants', '5045': 'Computers & peripherals wholesale' };
    return M[String(code || '').trim()] || '';
  }
  nowStamp() {
    const d = new Date(), p = (n) => (n < 10 ? '0' : '') + n;
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
  }
  fmtTs(v) {
    if (!v) return '—';
    const parts = String(v).split(' ');
    if (parts[0].indexOf('-') === -1) return v;
    return this.fmtDate(parts[0]) + (parts[1] ? ' · ' + parts[1] : '');
  }
  apvMissing(a) {
    if (!a) return [];
    const m = [];
    if (!String(a.mcc || '').trim()) m.push('MCC');
    if (a.ekyc !== 'Valid') m.push('eKYC verification');
    if (a.kyb !== 'Valid') m.push('KYB verification');
    if ((a.documents || []).some(d => d.status === 'Missing' || d.status === 'Expired')) m.push('Mandatory document');
    if (!String(a.descVi || '').trim() || !String(a.descEn || '').trim()) m.push('Transaction description (VI/EN)');
    if (!String(a.actVi || '').trim() || !String(a.actEn || '').trim()) m.push('Business activities (VI/EN)');
    if (a.plEnabled && !String(a.feePackage || '').trim()) m.push('Payment Link fee package');
    return m;
  }
  isOpenStatus(s2) { return s2 === 'PENDING' || s2 === 'CHANGES REQUESTED'; }
  txnScrollEl = null;
  txnThumbEl = null;
  txnTrackEl = null;
  setTxnScrollEl = (el) => { this.txnScrollEl = el; if (el) this.paintTxnThumb(); };
  setTxnThumbEl = (el) => { this.txnThumbEl = el; if (el) this.paintTxnThumb(); };
  setTxnTrackEl = (el) => { this.txnTrackEl = el; };
  paintTxnThumb = () => {
    const el = this.txnScrollEl, thumb = this.txnThumbEl;
    if (!el || !thumb) return;
    const max = el.scrollWidth - el.clientWidth;
    const pct = Math.max(12, Math.min(100, (el.clientWidth / el.scrollWidth) * 100));
    const ratio = max > 0 ? Math.max(0, Math.min(1, el.scrollLeft / max)) : 0;
    thumb.style.width = pct + '%';
    thumb.style.transform = 'translateX(' + (ratio * (100 - pct) * (100 / pct)) + '%)';
  };
  syncTxnScroll = () => { this.paintTxnThumb(); };
  scrollToRatio = (clientX) => {
    const el = this.txnScrollEl, track = this.txnTrackEl;
    if (!el || !track) return;
    const r = track.getBoundingClientRect();
    const thumbW = (el.clientWidth / el.scrollWidth) * r.width;
    const usable = Math.max(1, r.width - thumbW);
    const ratio = Math.max(0, Math.min(1, (clientX - r.left - thumbW / 2) / usable));
    el.scrollLeft = ratio * (el.scrollWidth - el.clientWidth);
    this.paintTxnThumb();
  };
  onThumbDown = (e) => {
    e.preventDefault();
    const move = (ev) => this.scrollToRatio(ev.clientX);
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      document.body.style.userSelect = '';
    };
    document.body.style.userSelect = 'none';
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    move(e);
  };
  jumpTxnScroll = (e) => this.onThumbDown(e);
  openApproval(id) { this.setState({ page: 'approvalDetail', apvId: id, apvExpand: null, docView: null }); }
  openNetworkNode(id) { this.setState({ networkSelected: id }); }
  openNetworkMerchant(id) {
    const node = (this.state.networkNodes || []).find(x => x.id === id);
    const merchant = (this.state.merchants || []).find(x => x.name === (node && node.name));
    if (merchant) this.setState({ page: 'detail', detailId: merchant.id });
    else this.toast('Merchant detail is not in this demo dataset');
  }
  openCommissionPartner(id) { this.setState({ page: 'commissionDetail', commissionPartner: id }); }
  updateTxnLifecycle(id, action) {
    const rows = this.txns || (this.txns = this.seedTxns());
    const row = rows.find(x => x.id === id);
    if (!row) return;
    if (action === 'void' && row.status !== 'AUTHORIZED') return this.toast('Void is only available before settlement.');
    if (action === 'refund' && row.status !== 'SETTLED') return this.toast('Refund is only available for settled transactions.');
    row.status = action === 'void' ? 'VOIDED' : 'REFUNDED';
    row.lifecycleAudit = (row.lifecycleAudit || []).concat([{ action: action === 'void' ? 'Void transaction' : 'Refund transaction', actor: this.state.currentUser.name, ts: '12 Sep 2026, 20:15' }]);
    this.setState({ txnView: row });
    this.toast(action === 'void' ? 'Transaction voided (demo)' : 'Refund recorded (demo)');
  }
  blankFilters() {
    return { entity: 'All', status: 'All', kyc: 'All', link: 'All', source: 'All', from: '', to: '', province: 'All', mcc: 'All' };
  }
  seed() {
    const mk = (o) => Object.assign({
      trading: o.name, address: '', descEn: '', descVi: '', actEn: '', actVi: '',
      link: { enabled: false, paySource: 'SoundBox S20', feeType: 'Percentage', feeValue: '1.2', validity: '24 hours', allowCancel: true, require3ds: true },
      audit: []
    }, o);
    const base = [
      ['J','Jagat Traders Pvt. Ltd','MID-88201','Enterprise Business','PVCOM','APPROVED','2026-01-10','+84 28 3822 1100','billing@jagattraders.vn','Valid','Ho Chi Minh','District 1','0301234567','PVC-0142','PVcomBank Ben Thanh','VUNG1','CIF-8820199','5411',true],
      ['B','Bhavya Stores & Bakery','MID-99482','Household Business','VIETPAY','PENDING','2026-01-12','+84 24 3941 7722','hello@bhavyastores.vn','Pending','Ha Noi','Cau Giay','0107788221','VP-0088','VietPay Cau Giay','VUNG2','CIF-9948210','5812',false],
      ['N','Ngoc Anh Luxury Boutique','MID-10394','Enterprise Business','PVCOM','APPROVED','2026-01-13','+84 28 3925 4410','care@ngocanhluxury.vn','Valid','Ho Chi Minh','District 3','0309911204','PVC-0219','PVcomBank Nam Ky','VUNG1','CIF-1039488','5651',true],
      ['H','HKD Nguyen Thanh Logistics','MID-44821','Household Business','VIETPAY','REJECTED','2026-01-14','+84 236 388 4412','ops@nguyenthanhlog.vn','Pending','Da Nang','Hai Chau','0401556677','VP-0311','VietPay Hai Chau','VUNG3','CIF-4482155','4214',false],
      ['T','Test iOS Sandbox Merchant','MID-90234','Household Business','VIETPAY','PENDING','2026-01-15','+84 28 7300 9001','sandbox@vietpay.com','Pending','Ho Chi Minh','Binh Thanh','0312000934','VP-0001','VietPay Sandbox','VUNG1','CIF-9023401','7399',false],
      ['A','An Binh Express Minimart','MID-77391','Enterprise Business','PVCOM','APPROVED','2026-01-15','+84 274 366 2200','kinhdoanh@anbinhexpress.vn','Valid','Binh Duong','Thu Dau Mot','0370099881','PVC-0455','PVcomBank Binh Duong','VUNG2','CIF-7739122','5499',true],
      ['H','Hoa Phat Industrial Group','MID-55610','Enterprise Business','PVCOM','REJECTED','2026-01-16','+84 225 388 7700','finance@hoaphatgroup.vn','Valid','Hai Phong','Le Chan','0200114455','PVC-0620','PVcomBank Hai Phong','VUNG3','CIF-5561088','5051',false],
      ['M','Minh Chau Pharmacy','MID-31207','Household Business','VIETPAY','APPROVED','2026-01-18','+84 28 3811 6650','minhchau.pharma@gmail.com','Valid','Ho Chi Minh','Tan Binh','0316650021','VP-0142','VietPay Tan Binh','VUNG1','CIF-3120744','5912',true],
      ['B','Bien Hoa Auto Service','MID-73310','Enterprise Business','PVCOM','APPROVED','2026-01-17','+84 251 388 7710','service@bienhoaauto.vn','Valid','Dong Nai','Bien Hoa','0360771922','PVC-0733','PVcomBank Bien Hoa','VUNG2','CIF-5580911','7538',false],
      ['S','Saigon Coffee Roasters','MID-66018','Enterprise Business','VIETPAY','PENDING','2026-01-19','+84 28 3944 2210','ops@saigonroasters.vn','Pending','Ho Chi Minh','District 7','0305544120','VP-0203','VietPay Phu My Hung','VUNG1','CIF-6601822','5814',false],
      ['V','Viet Tien Garment Store','MID-20551','Enterprise Business','PVCOM','APPROVED','2026-01-20','+84 24 3822 9911','store@viettien.com.vn','Valid','Ha Noi','Hoan Kiem','0100101308','PVC-0107','PVcomBank Hoan Kiem','VUNG2','CIF-2055177','5651',true]
    ].filter(r => r[5] === 'APPROVED');
    return base.map((r, i) => mk({
      id: 'm' + i, initial: r[0], name: r[1], mid: r[2], entity: r[3], source: r[4], status: r[5], date: r[6],
      phone: r[7], email: r[8], kyc: r[9], province: r[10], city: r[11], regCode: r[12], branchCode: r[13],
      branchName: r[14], region: r[15], cif: r[16], mcc: r[17],
      businessStatus: 'ACTIVE',
      tid: r[2] === 'MID-20551' ? '' : 'TID-' + r[2].slice(4) + '-01',
      posDevice: r[2] === 'MID-20551' ? '' : (i % 2 ? 'SoundBox S20' : 'PAX A920 Pro'),
      posSerial: r[2] === 'MID-20551' ? '' : 'POS-' + r[2].slice(4) + '-' + (310 + i),
      address: r[11] + ', ' + r[10] + ', Vietnam',
      trading: r[1].replace(' Pvt. Ltd', '').replace(' Group', ''),
      descEn: 'Retail purchase at ' + r[1],
      descVi: 'Giao dich mua hang tai ' + r[1],
      actEn: 'General retail and distribution of consumer goods, including in-store card acceptance and QR payments.',
      actVi: 'Ban le va phan phoi hang tieu dung, chap nhan thanh toan the tai quay va QR.',
      link: {
        registered: r[5] !== 'REJECTED',
        enabled: r[18],
        paySource: r[18] ? 'Both' : 'SoundBox S20',
        feeType: 'Percentage',
        feeValue: (i === 5 ? '' : '1.2'),
        validity: '24 hours',
        allowCancel: true,
        require3ds: true
      },
      audit: [
        { ts: r[6] + ' 09:12', actor: 'System', action: 'Account created', status: 'Done' },
        { ts: r[6] + ' 09:40', actor: 'Merchant', action: 'Documents uploaded', status: 'Done' },
        { ts: r[6] + ' 10:05', actor: 'KYC Engine', action: 'KYC/KYB completed', status: r[9] === 'Valid' ? 'Valid' : 'Pending' },
        { ts: r[6] + ' 10:30', actor: 'Duy Nguyen', action: 'Submitted to bank', status: 'Done' }
      ].concat(r[5] === 'APPROVED' ? [{ ts: r[6] + ' 14:02', actor: 'Bank Ops', action: 'Merchant approved', status: 'Approved' }] : r[5] === 'REJECTED' ? [{ ts: r[6] + ' 14:02', actor: 'Bank Ops', action: 'Merchant rejected', status: 'Rejected' }] : [])
        .concat(r[18] ? [{ ts: r[6] + ' 15:20', actor: 'Duy Nguyen', action: 'Payment Link enabled', status: 'Enabled' }] : [])
    }));
  }
  measure = () => {
    const el = document.querySelector('[data-demo-host]');
    const w = Math.max(320, el ? el.clientWidth : (typeof window !== 'undefined' ? window.innerWidth : 1440));
    if (Math.abs(w - this.state.hostW) > 1) this.setState({ hostW: w });
  };
  componentDidMount() {
    const attach = () => {
      const el = document.querySelector('[data-demo-host]');
      if (!el) { this.retry = setTimeout(attach, 60); return; }
      if (typeof ResizeObserver !== 'undefined') {
        this.ro = new ResizeObserver(this.measure);
        this.ro.observe(el);
        if (el.parentElement) this.ro.observe(el.parentElement);
        this.ro.observe(document.documentElement);
      }
      this.measure();
    };
    attach();
    if (document.documentElement) document.documentElement.lang = 'en';
    window.addEventListener('resize', this.measure);
    window.addEventListener('resize', this.syncTxnScroll);
    this.poll = setInterval(this.measure, 400);
  }
  componentDidUpdate() {
    if (this.state.page === 'txns') this.paintTxnThumb();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.syncTxnScroll);
    if (this.ro) this.ro.disconnect();
    if (this.retry) clearTimeout(this.retry);
    if (this.toastT) clearTimeout(this.toastT);
    if (this.poll) clearInterval(this.poll);
    if (this.loadT) clearTimeout(this.loadT);
    window.removeEventListener('resize', this.measure);
  }
  toast(msg) {
    this.setState({ toast: msg });
    if (this.toastT) clearTimeout(this.toastT);
    this.toastT = setTimeout(() => this.setState({ toast: null }), 2800);
  }
  fmtDate(iso) {
    const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const p = iso.split('-');
    return m[parseInt(p[1], 10) - 1] + ' ' + parseInt(p[2], 10) + ', ' + p[0];
  }
  seedApps() {
    const doc = (name, type, on, by, ver, status) => ({ name: name, type: type, on: on, by: by, ver: ver, status: status });
    const rows = [
      { id: 'APP-2601', name: 'Cho Lon Wholesale Foods', entity: 'Enterprise Business', customerType: 'Corporate', source: 'PVCOM', status: 'PENDING', ekyc: 'Valid', kyb: 'Valid', kyc: 'Valid', date: '2026-01-19', updatedOn: '2026-01-19 10:40', phone: '+84 28 3856 4400', cccd: '079086001234', email: 'ketoan@cholonfoods.vn', regCode: '0302119844', cif: 'CIF-7781200', gatewayId: 'GW-88410', mid: 'MID-88410', province: 'Ho Chi Minh', city: 'District 5', region: 'VUNG1', branchCode: 'PVC-0512', branchName: 'PVcomBank Cho Lon', mcc: '5411', deviceRequests: ['POS'], docs: '4 of 4 uploaded', plEnabled: true, feeValue: '1.5', feePackage: 'PKG-STD 1.5%', maker: 'Linh Tran', checker: 'Duy Nguyen', kycDoneOn: '2026-01-19 10:02', reviewerNotes: 'Documents match the registration certificate. Ready for approval.',
        documents: [doc('Business registration certificate', 'Registration', '2026-01-19', 'Linh Tran', 'v1', 'Verified'), doc('Legal representative ID', 'Identity', '2026-01-19', 'Linh Tran', 'v1', 'Verified'), doc('Bank account confirmation', 'Banking', '2026-01-19', 'Linh Tran', 'v1', 'Verified'), doc('Tax registration', 'Tax', '2026-01-19', 'Linh Tran', 'v1', 'Verified')] },
      { id: 'APP-2602', name: 'Hanoi Silk Atelier', entity: 'Household Business', customerType: 'Household business', source: 'VIETPAY', status: 'PENDING', ekyc: 'Valid', kyb: 'Pending', kyc: 'Pending', date: '2026-01-20', updatedOn: '2026-01-20 09:25', phone: '+84 24 3927 5511', cccd: '001089004521', email: 'hello@hanoisilk.vn', regCode: '0109922410', cif: 'CIF-4410932', gatewayId: 'GW-45501', mid: 'MID-45501', province: 'Ha Noi', city: 'Hoan Kiem', region: 'VUNG2', branchCode: 'VP-0455', branchName: 'VietPay Hoan Kiem', mcc: '5651', deviceRequests: ['SOUNDBOX'], docs: '2 of 4 uploaded', plEnabled: false, feeValue: '', feePackage: '', maker: 'Mai Pham', checker: null, kycDoneOn: '', reviewerNotes: 'KYB pending — waiting for the household business licence.',
        documents: [doc('Household business licence', 'Registration', '2026-01-20', 'Mai Pham', 'v1', 'Pending'), doc('Owner ID card', 'Identity', '2026-01-20', 'Mai Pham', 'v1', 'Verified'), doc('Bank account confirmation', 'Banking', '', '', '—', 'Missing'), doc('Tax registration', 'Tax', '', '', '—', 'Missing')] },
      { id: 'APP-2603', name: 'Da Nang Seafood Market', entity: 'Household Business', customerType: 'Household business', source: 'VIETPAY', status: 'PENDING', ekyc: 'Valid', kyb: 'Valid', kyc: 'Valid', date: '2026-01-20', updatedOn: '2026-01-20 11:10', phone: '+84 236 355 8820', cccd: '048091008736', email: 'ops@dnseafood.vn', regCode: '0401882300', cif: 'CIF-9920144', gatewayId: 'GW-38820', mid: 'MID-38820', province: 'Da Nang', city: 'Son Tra', region: 'VUNG3', branchCode: 'VP-0388', branchName: 'VietPay Son Tra', mcc: '', deviceRequests: ['POS', 'SOUNDBOX'], docs: '4 of 4 uploaded', plEnabled: true, feeValue: '1.8', feePackage: 'PKG-STD 1.8%', maker: 'Mai Pham', checker: 'Duy Nguyen', kycDoneOn: '2026-01-20 10:15', reviewerNotes: 'Verification complete. MCC still has to be assigned by the maker.',
        documents: [doc('Household business licence', 'Registration', '2026-01-20', 'Mai Pham', 'v1', 'Verified'), doc('Owner ID card', 'Identity', '2026-01-20', 'Mai Pham', 'v1', 'Verified'), doc('Bank account confirmation', 'Banking', '2026-01-20', 'Mai Pham', 'v1', 'Verified'), doc('Food safety certificate', 'Licence', '2026-01-20', 'Mai Pham', 'v1', 'Verified')] },
      { id: 'APP-2604', name: 'Bien Hoa Auto Service', entity: 'Enterprise Business', customerType: 'Corporate', source: 'PVCOM', status: 'APPROVED', ekyc: 'Valid', kyb: 'Valid', kyc: 'Valid', date: '2026-01-17', updatedOn: '2026-01-17 15:40', phone: '+84 251 388 7710', cccd: '075084002918', email: 'service@bienhoaauto.vn', regCode: '0360771922', cif: 'CIF-5580911', gatewayId: 'GW-73310', mid: 'MID-73310', province: 'Dong Nai', city: 'Bien Hoa', region: 'VUNG2', branchCode: 'PVC-0733', branchName: 'PVcomBank Bien Hoa', mcc: '7538', deviceRequests: ['POS'], docs: '4 of 4 uploaded', plEnabled: false, feeValue: '', feePackage: '', maker: 'Linh Tran', checker: 'Duy Nguyen', kycDoneOn: '2026-01-17 10:20', reviewerNotes: 'Approved without exceptions.',
        documents: [doc('Business registration certificate', 'Registration', '2026-01-17', 'Linh Tran', 'v1', 'Verified'), doc('Legal representative ID', 'Identity', '2026-01-17', 'Linh Tran', 'v1', 'Verified'), doc('Bank account confirmation', 'Banking', '2026-01-17', 'Linh Tran', 'v1', 'Verified'), doc('Tax registration', 'Tax', '2026-01-17', 'Linh Tran', 'v1', 'Verified')] },
      { id: 'APP-2605', name: 'Hue Heritage Tours', entity: 'Household Business', customerType: 'Sole proprietor', source: 'VIETPAY', status: 'CHANGES REQUESTED', ekyc: 'Valid', kyb: 'Pending', kyc: 'Pending', date: '2026-01-18', updatedOn: '2026-01-19 15:20', phone: '+84 234 388 2210', cccd: '046092006415', email: 'booking@hueheritage.vn', regCode: '0330118820', cif: 'CIF-3301188', gatewayId: 'GW-52210', mid: 'MID-52210', province: 'Hue', city: 'Phu Hoi', region: 'VUNG3', branchCode: 'VP-0522', branchName: 'VietPay Hue', mcc: '4722', deviceRequests: ['SOUNDBOX'], docs: '3 of 4 uploaded', plEnabled: false, feeValue: '', feePackage: '', maker: 'Linh Tran', checker: 'Duy Nguyen', kycDoneOn: '', actVi: '', reviewerNotes: 'Business activities in Vietnamese are empty and the tour operator licence expired.', reason: 'Business activities (VI) missing and the tour operator licence expired on Dec 31, 2025 — upload a valid licence.',
        documents: [doc('Business registration certificate', 'Registration', '2026-01-18', 'Linh Tran', 'v1', 'Verified'), doc('Owner ID card', 'Identity', '2026-01-18', 'Linh Tran', 'v1', 'Verified'), doc('Tour operator licence', 'Licence', '2025-06-02', 'Linh Tran', 'v1', 'Expired'), doc('Bank account confirmation', 'Banking', '2026-01-18', 'Linh Tran', 'v1', 'Verified')] },
      { id: 'APP-2606', name: 'Can Tho Rice Export Co.', entity: 'Enterprise Business', customerType: 'Corporate', source: 'PVCOM', status: 'REJECTED', ekyc: 'Valid', kyb: 'Failed', kyc: 'Pending', date: '2026-01-16', updatedOn: '2026-01-17 09:05', phone: '+84 292 383 6600', cccd: '092082003677', email: 'finance@canthorice.vn', regCode: '1801229900', cif: 'CIF-1801229', gatewayId: 'GW-61900', mid: 'MID-61900', province: 'Can Tho', city: 'Ninh Kieu', region: 'VUNG3', branchCode: 'PVC-0619', branchName: 'PVcomBank Can Tho', mcc: '5199', deviceRequests: ['POS'], docs: '4 of 4 uploaded', plEnabled: false, feeValue: '', feePackage: '', maker: 'Linh Tran', checker: 'Duy Nguyen', kycDoneOn: '2026-01-16 14:40', reviewerNotes: 'Registry check failed — legal entity name mismatch.', reason: 'Business registration certificate expired on Dec 31, 2025 and the submitted bank statement does not match the registered legal entity name.',
        documents: [doc('Business registration certificate', 'Registration', '2026-01-16', 'Linh Tran', 'v1', 'Expired'), doc('Legal representative ID', 'Identity', '2026-01-16', 'Linh Tran', 'v1', 'Verified'), doc('Bank account confirmation', 'Banking', '2026-01-16', 'Linh Tran', 'v2', 'Replaced'), doc('Tax registration', 'Tax', '2026-01-16', 'Linh Tran', 'v1', 'Verified')] },
      { id: 'APP-2607', name: 'Nha Trang Dive Center', entity: 'Household Business', customerType: 'Sole proprietor', source: 'VIETPAY', status: 'PENDING', ekyc: 'Valid', kyb: 'Valid', kyc: 'Valid', date: '2026-01-18', updatedOn: '2026-01-21 08:05', phone: '+84 258 352 7700', cccd: '056090005824', email: 'dive@nhatrangdive.vn', regCode: '0420778800', cif: 'CIF-4207788', gatewayId: 'GW-27700', mid: 'MID-27700', province: 'Khanh Hoa', city: 'Nha Trang', region: 'VUNG3', branchCode: 'VP-0277', branchName: 'VietPay Nha Trang', mcc: '7999', deviceRequests: ['SOUNDBOX'], docs: '4 of 4 uploaded', plEnabled: true, feeValue: '2.0', feePackage: 'PKG-STD 2.0%', maker: 'Mai Pham', checker: 'Duy Nguyen', kycDoneOn: '2026-01-18 12:00', docsUpdated: true, reviewerNotes: 'Business licence was replaced after submission — re-review the new version before approving.',
        documents: [doc('Household business licence', 'Registration', '2026-01-21', 'Mai Pham', 'v2', 'Pending'), doc('Owner ID card', 'Identity', '2026-01-18', 'Mai Pham', 'v1', 'Verified'), doc('Bank account confirmation', 'Banking', '2026-01-18', 'Mai Pham', 'v1', 'Verified'), doc('Diving safety certificate', 'Licence', '2026-01-18', 'Mai Pham', 'v1', 'Verified')] },
      { id: 'APP-2608', name: 'Vinh Long Agri Supply', entity: 'Enterprise Business', customerType: 'Corporate', source: 'PVCOM', status: 'PENDING', ekyc: 'Pending', kyb: 'Pending', kyc: 'Pending', date: '2026-01-21', updatedOn: '2026-01-21 09:40', phone: '+84 270 382 4400', cccd: '084087009132', email: 'ketoan@vinhlongagri.vn', regCode: '1500442200', cif: 'CIF-1500442', gatewayId: 'GW-44200', mid: 'MID-44200', province: 'Vinh Long', city: 'Long Ho', region: 'VUNG3', branchCode: 'PVC-0442', branchName: 'PVcomBank Vinh Long', mcc: '5199', deviceRequests: ['POS', 'SOUNDBOX'], docs: '1 of 4 uploaded', plEnabled: false, feeValue: '', feePackage: '', maker: 'Mai Pham', checker: null, kycDoneOn: '', addressOk: false, reviewerNotes: '', descVi: '',
        documents: [doc('Business registration certificate', 'Registration', '2026-01-21', 'Mai Pham', 'v1', 'Pending'), doc('Legal representative ID', 'Identity', '', '', '—', 'Missing'), doc('Bank account confirmation', 'Banking', '', '', '—', 'Missing'), doc('Tax registration', 'Tax', '', '', '—', 'Missing')] },
      { id: 'APP-2609', name: 'Sapa Mountain Lodge', entity: 'Enterprise Business', customerType: 'Corporate', source: 'VIETPAY', status: 'PENDING', ekyc: 'Valid', kyb: 'Valid', kyc: 'Valid', date: '2026-01-21', updatedOn: '2026-01-21 10:15', phone: '+84 214 387 1100', cccd: '010085007469', email: 'stay@sapalodge.vn', regCode: '5300112200', cif: 'CIF-5300112', gatewayId: 'GW-11220', mid: 'MID-11220', province: 'Lao Cai', city: 'Sapa', region: 'VUNG2', branchCode: 'VP-0112', branchName: 'VietPay Lao Cai', mcc: '7011', deviceRequests: ['SOUNDBOX'], docs: '4 of 4 uploaded', plEnabled: true, feeValue: '', feePackage: '', maker: 'Linh Tran', checker: 'Duy Nguyen', kycDoneOn: '2026-01-21 09:50', reviewerNotes: 'Payment Link requested but no fee package has been assigned yet.',
        documents: [doc('Business registration certificate', 'Registration', '2026-01-21', 'Linh Tran', 'v1', 'Verified'), doc('Legal representative ID', 'Identity', '2026-01-21', 'Linh Tran', 'v1', 'Verified'), doc('Bank account confirmation', 'Banking', '2026-01-21', 'Linh Tran', 'v1', 'Verified'), doc('Tourism business licence', 'Licence', '2026-01-21', 'Linh Tran', 'v1', 'Verified')] }
    ];
    const chk = (r) => [
      { label: 'Legal entity verified against the national registry', ok: r.kyb === 'Valid' },
      { label: 'Legal representative identity verified (eKYC)', ok: r.ekyc === 'Valid' },
      { label: 'Bank account ownership confirmed', ok: (r.documents || []).some(d => d.type === 'Banking' && d.status === 'Verified') },
      { label: 'Registered address matches the documents', ok: r.addressOk !== false },
      { label: 'MCC assigned', ok: !!String(r.mcc || '').trim() }
    ];
    const aud = (r) => {
      const evs = [
        { ts: r.date + ' 08:05', actor: 'System', action: 'Account created from the VietPay App', status: 'Done' },
        { ts: r.date + ' 08:30', actor: r.maker, action: 'Application details entered', status: 'Done' },
        { ts: r.date + ' 09:15', actor: r.maker, action: 'Documents uploaded', status: r.docs },
        { ts: r.kycDoneOn || (r.date + ' 10:02'), actor: 'KYC Engine', action: 'eKYC/KYB verification', status: 'eKYC ' + r.ekyc + ' · KYB ' + r.kyb },
        { ts: r.date + ' 10:30', actor: r.maker, action: 'Submitted to bank', status: 'Submitted' }
      ];
      if (r.checker) evs.push({ ts: r.date + ' 11:00', actor: 'System', action: 'Assigned to checker — ' + r.checker, status: 'Assigned' });
      if (r.docsUpdated) evs.push({ ts: r.updatedOn, actor: r.maker, action: 'Document replaced after submission — re-review required', status: 'Updated' });
      if (r.status === 'CHANGES REQUESTED') evs.push({ ts: r.updatedOn, actor: r.checker || 'Bank Ops', action: 'Changes requested — ' + r.reason, status: 'Changes requested' });
      if (r.status === 'REJECTED') evs.push({ ts: r.updatedOn, actor: r.checker || 'Bank Ops', action: 'Application rejected — ' + r.reason, status: 'Rejected' });
      if (r.status === 'APPROVED') evs.push({ ts: r.updatedOn, actor: r.checker || 'Bank Ops', action: 'Application approved', status: 'Approved' });
      return evs;
    };
    return rows.map(r => Object.assign({
      address: r.city + ', ' + r.province + ', Vietnam',
      trading: r.name,
      descEn: 'Purchase at ' + r.name,
      descVi: 'Giao dich tai ' + r.name,
      actEn: 'Retail and distribution of goods with card and QR acceptance.',
      actVi: 'Ban le va phan phoi hang hoa, chap nhan the va QR.',
      channel: 'SoundBox S20', feeType: 'Percentage', validity: '24 hours', allowCancel: true,
      reason: '', checker: null, docsUpdated: false, reviewerNotes: '',
      checklist: chk(r), audit: aud(r)
    }, r));
  }
  feeIssue(feeType, feeValue, required) {
    const raw = String(feeValue == null ? '' : feeValue).trim();
    if (!raw) return required ? 'Enter a fee value.' : null;
    const n = Number(raw.replace(',', '.'));
    if (isNaN(n)) return 'Enter a number.';
    if (feeType === 'Percentage') { if (n <= 0 || n > 100) return 'Percentage must be between 0 and 100.'; return null; }
    if (n <= 0) return 'Fixed fee must be a positive amount.';
    return null;
  }
  linkIssue(cfg, enabled) {
    if (!cfg.paySource) return 'Initiation Channel is required.';
    if (!cfg.validity) return 'Link Validity Period is required.';
    return this.feeIssue(cfg.feeType, cfg.feeValue, enabled);
  }
  plStateOf(m) {
    if (!m.link.registered) return 'not_registered';
    if (m.status !== 'APPROVED') return 'pending';
    if (this.linkIssue(m.link, m.link.enabled)) return 'incomplete';
    return m.link.enabled ? 'enabled' : 'disabled';
  }
  openApp(id) {
    const a = this.state.apps.find(x => x.id === id);
    this.setState({ page: 'appDetail', appId: id, draftApp: Object.assign({}, a) });
  }
  runLoad() {
    this.setState({ loadState: 'loading' });
    if (this.loadT) clearTimeout(this.loadT);
    this.loadT = setTimeout(() => this.setState({ loadState: 'ready' }), 900);
  }
  openDetail(id) {
    const m = this.state.merchants.find(x => x.id === id);
    this.setState({ page: 'detail', detailId: id, linkDraft: Object.assign({}, m.link) });
  }
  visible() {
    const st = this.state, fl = st.filters, q = st.search.trim().toLowerCase();
    let list = st.merchants.filter(m => {
      if (m.status !== 'APPROVED') return false;
      if (st.tab === 'vietpay' && m.source !== 'VIETPAY') return false;
      if (st.tab === 'pvcom' && m.source !== 'PVCOM') return false;
      if (fl.entity !== 'All' && m.entity !== fl.entity) return false;
      if (fl.status !== 'All' && (m.businessStatus || 'ACTIVE') !== fl.status.toUpperCase()) return false;
      if (fl.kyc !== 'All' && m.kyc !== fl.kyc) return false;
      if (fl.link !== 'All' && (fl.link === 'Enabled') !== m.link.enabled) return false;
      if (fl.source !== 'All' && m.source !== fl.source) return false;
      if (fl.province !== 'All' && m.province !== fl.province) return false;
      if (fl.mcc !== 'All' && m.mcc !== fl.mcc) return false;
      if (fl.from && m.date < fl.from) return false;
      if (fl.to && m.date > fl.to) return false;
      if (q && !(m.name + ' ' + m.mid + ' ' + (m.tid || '') + ' ' + (m.posSerial || '') + ' ' + m.phone + ' ' + m.email + ' ' + m.address + ' ' + m.province).toLowerCase().includes(q)) return false;
      return true;
    });
    const k = this.state.sortKey, dir = this.state.sortDir === 'asc' ? 1 : -1;
    const key = (m) => k === 'name' ? m.name : k === 'mid' ? m.mid : k === 'status' ? (m.businessStatus || 'ACTIVE') : k === 'kyc' ? m.kyc : m.date;
    return list.sort((a, b) => key(a) > key(b) ? dir : key(a) < key(b) ? -dir : 0);
  }
  renderVals() {
    const w = this.state.hostW;
    const mode = w < 768 ? 'mobile' : w < 1280 ? 'tablet' : 'desktop';
    const isMobile = mode === 'mobile', isTablet = mode === 'tablet', isDesk = mode === 'desktop';
    const rail = isTablet ? !this.state.railForced : this.state.railForced;
    const st = this.state;
    const nav = (active) => 'border:none;background:transparent;font-family:inherit;font-size:12px;align-self:stretch;display:flex;align-items:center;justify-content:' + (rail ? 'center' : 'flex-start') + ';gap:12px;padding:12px;border-radius:8px;cursor:pointer;' + (active ? 'background:#0073BF;color:#fff;font-weight:600' : 'color:rgba(255,255,255,.82);font-weight:500');
    const chip = (bg, fg) => 'display:inline-block;border-radius:4px;padding:4px 8px;font-size:11px;font-weight:700;letter-spacing:0.3px;text-transform:uppercase;background:' + bg + ';color:' + fg;
    const typeChip = (t) => t === 'PVCOM' ? chip('#EAF6FD', '#0073BF') : chip('#BFE0F5', '#0D3C7D');
    const statusChip = (s2) => s2 === 'APPROVED' || s2 === 'ACTIVE' ? chip('#DCEEE4', '#2E7D5B') : s2 === 'PENDING' || s2 === 'SUSPENDED' ? chip('#FBEED1', '#B27C12') : s2 === 'INACTIVE' ? chip('#E6E6E4', '#696B68') : s2 === 'CHANGES REQUESTED' ? chip('#EAF6FD', '#0073BF') : chip('#BFE0F5', '#0D3C7D');
    const kycChip = (k) => k === 'Valid' ? chip('#DCEEE4', '#2E7D5B') : chip('#FBEED1', '#B27C12');
    const tabStyle = (on) => 'border:none;background:transparent;font-family:inherit;display:flex;align-items:center;gap:8px;border-radius:6px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;' + (on ? 'background:#fff;color:#1C1D1B;box-shadow:0 1px 2px rgba(0,0,0,.06)' : 'color:#696B68');
    const countStyle = (on) => 'border:none;background:transparent;font-family:inherit;border-radius:999px;padding:2px 8px;font-size:11px;font-weight:700;' + (on ? 'background:#EAF6FD;color:#0073BF' : 'background:#E6E6E4;color:#696B68');
    const dashboardAll = st.merchants.filter(m => m.status === 'APPROVED' && (st.dashboardEntity === 'ALL' || (st.dashboardEntity === 'PVCB' ? m.source === 'PVCOM' : m.source === 'VIETPAY')));
    const all = dashboardAll;
    const dashboardTxns = this.txns || (this.txns = this.seedTxns());
    const dashboardTxnRows = dashboardTxns.filter(x => st.dashboardEntity === 'ALL' || (st.dashboardEntity === 'PVCB' ? x.source === 'PVCOM' : x.source === 'VIETPAY'));
    const dashboardTxnValue = dashboardTxnRows.reduce((sum, x) => sum + Number(x.amount || 0), 0);
    const dashboardApproved = all.filter(m => (m.businessStatus || 'ACTIVE') === 'ACTIVE').length;
    const dashboardPending = st.merchants.filter(m => (st.dashboardEntity === 'ALL' || (st.dashboardEntity === 'PVCB' ? m.source === 'PVCOM' : m.source === 'VIETPAY')) && m.status === 'PENDING').length;
    const dashboardCommission = st.dashboardEntity === 'PVCB' ? 0 : this.seedCommission().reduce((sum, x) => sum + x.transactionFee + x.rentalFee, 0);
    const rowsRaw = this.visible();
    const setDraft = (k) => (e) => { const v = e.target.value; this.setState(s2 => ({ draft: Object.assign({}, s2.draft, { [k]: v }) })); };
    const fl = st.filters;
    const chipsList = [];
    const label = { entity: 'Entity Type', status: 'Business Status', kyc: 'KYC/KYB', link: 'Payment Link', source: 'Source', province: 'Province/City', mcc: 'MCC', from: 'From', to: 'To' };
    Object.keys(label).forEach(k => {
      const v = fl[k];
      if (v && v !== 'All') chipsList.push({ key: k, text: label[k] + ': ' + v, clear: () => this.setState(s2 => ({ filters: Object.assign({}, s2.filters, { [k]: (k === 'from' || k === 'to') ? '' : 'All' }), draft: Object.assign({}, s2.draft, { [k]: (k === 'from' || k === 'to') ? '' : 'All' }) })) });
    });
    const T = {
      en: { appName: 'VietPay MMS', roleAdmin: 'Administrator', notifications: 'Notifications', markAll: 'Mark all as read', noNotif: 'You are all caught up.', approve: 'Approve', reject: 'Reject', cancel: 'Cancel', reasonLabel: 'Reason for rejection', reasonPlaceholder: 'Explain what the merchant needs to fix', reasonRequired: 'A reason is required before rejecting.', approveTitle: 'Approve merchant', rejectTitle: 'Reject merchant' },
      vi: { appName: 'VietPay MMS', roleAdmin: 'Quan tri vien', notifications: 'Thong bao', markAll: 'Danh dau da doc', noNotif: 'Khong co thong bao moi.', approve: 'Phe duyet', reject: 'Tu choi', cancel: 'Huy', reasonLabel: 'Ly do tu choi', reasonPlaceholder: 'Neu ro merchant can bo sung gi', reasonRequired: 'Vui long nhap ly do truoc khi tu choi.', approveTitle: 'Phe duyet merchant', rejectTitle: 'Tu choi merchant' }
    };
    const t = T[st.lang];
    const d = st.detailId ? st.merchants.find(m => m.id === st.detailId) : null;
    const ld = st.linkDraft || { enabled: false, paySource: 'SoundBox S20', feeType: 'Percentage', feeValue: '', validity: '24 hours', allowCancel: true, require3ds: true };
    const setLink = (k, v) => this.setState(s2 => ({ linkDraft: Object.assign({}, s2.linkDraft, { [k]: v }) }));
    const toggleStyle = (on, locked) => 'font-family:inherit;width:46px;height:26px;border-radius:999px;padding:3px;display:flex;border:none;flex-shrink:0;justify-content:' + (on ? 'flex-end' : 'flex-start') + ';background:' + (on ? '#0073BF' : '#DFDFDF') + ';' + (locked ? 'opacity:.45;cursor:not-allowed' : 'cursor:pointer');
    const fieldStyle = (bad, locked) => 'font-family:inherit;font-size:14px;color:#373A36;border:1px solid ' + (bad ? '#0D3C7D' : '#DFDFDF') + ';border-radius:8px;padding:10px 12px;background:' + (locked ? '#F5F5F4' : '#fff') + ';' + (locked ? 'opacity:.6;cursor:not-allowed' : '');
    const plLabels = {
      not_registered: ['NOT REGISTERED', 'Payment Link has not been requested for this merchant.'],
      pending: ['PENDING APPROVAL', 'Registered during onboarding — activates once the merchant is approved.'],
      incomplete: ['CONFIGURATION INCOMPLETE', 'Some required fields are missing or invalid.'],
      enabled: ['ENABLED', 'Merchant can create payment links.'],
      disabled: ['DISABLED', 'Registered but currently switched off.']
    };
    const plChip = (state) => state === 'enabled' ? chip('#DCEEE4', '#2E7D5B')
      : state === 'pending' ? chip('#FBEED1', '#B27C12')
      : state === 'incomplete' ? chip('#BFE0F5', '#0D3C7D')
      : chip('#E6E6E4', '#696B68');
    const plState = d ? this.plStateOf(d) : 'not_registered';
    const plText = plLabels[plState][0];
    const plNote = plLabels[plState][1];
    const plLocked = !!d && d.status !== 'APPROVED';
    const plLockReason = d && d.status === 'PENDING'
      ? 'Only an approved merchant can have Payment Link enabled. Approve the merchant first.'
      : 'This merchant was rejected — Payment Link cannot be configured.';
    const feeErr = this.feeIssue(ld.feeType, ld.feeValue, ld.enabled);
    const cfgIssue = this.linkIssue(ld, ld.enabled);
    const approveReason = !d ? '' : (d.kyc !== 'Valid'
      ? 'KYC/KYB must be Valid before approval — currently ' + (d.kyc || 'missing') + '.'
      : (!d.mcc ? 'MCC is missing. Add an MCC before approving.' : ''));
    const approveBlocked = !!d && d.status === 'PENDING' && !!approveReason;
    const ap = st.appId ? st.apps.find(x => x.id === st.appId) : null;
    const da = st.draftApp || { trading: '', mcc: '', kyc: 'Pending', descEn: '', descVi: '', actEn: '', actVi: '', plEnabled: false, channel: 'SoundBox S20', feeType: 'Percentage', feeValue: '', validity: '24 hours', allowCancel: true };
    const setApp = (k) => (e) => { const v = e.target.value; this.setState(s2 => ({ draftApp: Object.assign({}, s2.draftApp, { [k]: v }) })); };
    const appFeeErr = da.plEnabled ? this.feeIssue(da.feeType, da.feeValue, true) : null;
    const appIssue = da.plEnabled
      ? (!da.channel ? 'Initiation Channel is required.' : (!da.validity ? 'Link Validity Period is required.' : appFeeErr))
      : null;
    const appMissing = [];
    if (!ap || (da.kyc !== 'Valid')) appMissing.push('KYC/KYB must be Valid');
    if (!String(da.mcc || '').trim()) appMissing.push('MCC is required');
    if (appIssue) appMissing.push(appIssue);
    const appApproveBlocked = !!ap && ap.status === 'PENDING' && appMissing.length > 0;
    const appApproveReason = appMissing.length ? 'Complete before approving: ' + appMissing.join(' · ') : '';
    const appServices = (x) => (x.deviceRequests || []).map((name, i) => ({
      key: name + '-' + i,
      label: name === 'SOUNDBOX' ? 'SoundBox S20' : name,
      style: name === 'POS' ? chip('#EAF6FD', '#0073BF') : chip('#F1E8FF', '#7C3AED')
    })).concat(x.plEnabled ? [{ key: 'payment-link', label: 'PAYMENT LINK', style: chip('#DCEEE4', '#2E7D5B') }] : []);
    const aq = st.appSearch.trim().toLowerCase();
    const aqDigits = /^[+\d\s().-]+$/.test(aq) ? aq.replace(/\D/g, '') : '';
    const appSourceList = st.apps.filter(x => st.appSrc === 'all' || x.source === st.appSrc);
    const appList = appSourceList.filter(x => {
      const appStatusMap = { pending: 'PENDING', changes: 'CHANGES REQUESTED', approved: 'APPROVED', rejected: 'REJECTED' };
      if (st.appTab !== 'all' && x.status !== appStatusMap[st.appTab]) return false;
      const appSearchText = (x.phone + ' ' + x.cccd + ' ' + x.id + ' ' + x.name).toLowerCase();
      const phoneDigits = String(x.phone || '').replace(/\D/g, '');
      const localPhoneDigits = phoneDigits.startsWith('84') ? '0' + phoneDigits.slice(2) : phoneDigits;
      const cccdDigits = String(x.cccd || '').replace(/\D/g, '');
      const digitMatch = aqDigits && (phoneDigits.includes(aqDigits) || localPhoneDigits.includes(aqDigits) || cccdDigits.includes(aqDigits));
      if (aq && !appSearchText.includes(aq) && !digitMatch) return false;
      return true;
    });
    const appTotal = appList.length;
    const appPages = Math.max(1, Math.ceil(appTotal / st.appPer));
    const appPageIdx = Math.min(st.appPage, appPages - 1);
    const appSlice = appList.slice(appPageIdx * st.appPer, appPageIdx * st.appPer + st.appPer);
    const REG = { VUNG1: 'Southern cluster', VUNG2: 'Northern cluster', VUNG3: 'Central & coastal' };
    const mapPool = st.merchants.filter(m => st.mapSource === 'All sources' || m.source === st.mapSource);
    const networkNodes = st.networkNodes || this.seedNetwork();
    const networkSelected = networkNodes.find(n => n.id === st.networkSelected) || networkNodes[0];
    const networkChildren = networkSelected.children.map(id => networkNodes.find(n => n.id === id)).filter(Boolean);
    const networkTreeRows = networkNodes.map(n => ({
      key: n.id, id: n.id, name: n.name, code: n.code, kind: n.kind, merchants: String(n.merchants), commission: this.fmtVnd(n.commission), status: n.status,
      selected: n.id === networkSelected.id,
      style: 'display:flex;align-items:center;gap:12px;width:100%;text-align:left;border:1px solid ' + (n.id === networkSelected.id ? '#0073BF' : '#DFDFDF') + ';background:' + (n.id === networkSelected.id ? '#EAF6FD' : '#fff') + ';border-radius:8px;padding:12px 14px;cursor:pointer',
      pick: () => this.openNetworkNode(n.id),
      open: () => n.kind === 'Merchant' ? this.openNetworkMerchant(n.id) : this.openNetworkNode(n.id)
    }));
    const networkChildRows = networkChildren.map(n => ({
      key: n.id, id: n.id, name: n.name, code: n.code, kind: n.kind, merchants: String(n.merchants), commission: this.fmtVnd(n.commission), status: n.status,
      statusStyle: n.status === 'ACTIVE' ? chip('#DCEEE4', '#2E7D5B') : chip('#FBEED1', '#B27C12'), open: () => n.kind === 'Merchant' ? this.openNetworkMerchant(n.id) : this.openNetworkNode(n.id)
    }));
    const commissionRows = this.seedCommission();
    const selectedCommission = commissionRows.find(x => x.id === st.commissionPartner) || commissionRows[0];
    const commissionTotalTxn = commissionRows.reduce((sum, x) => sum + x.transactionFee, 0);
    const commissionTotalRental = commissionRows.reduce((sum, x) => sum + x.rentalFee, 0);
    const commissionTableRows = commissionRows.map(x => ({
      key: x.id, id: x.id, partner: x.partner, mid: x.mid, merchants: String(x.merchants), transactionFee: this.fmtVnd(x.transactionFee), rentalFee: this.fmtVnd(x.rentalFee), lifetime: this.fmtVnd(x.lifetime), balance: this.fmtVnd(x.balance), status: x.status,
      statusStyle: chip('#DCEEE4', '#2E7D5B'), selected: x.id === selectedCommission.id, open: () => this.openCommissionPartner(x.id)
    }));
    const commissionExport = () => {
      const head = ['Partner', 'MID', 'Referred merchants', 'Transaction fee', 'POS rental fee', 'Lifetime points', 'Balance points', 'Status'];
      const body = commissionRows.map(x => [x.partner, x.mid, x.merchants, x.transactionFee, x.rentalFee, x.lifetime, x.balance, x.status]);
      const csv = [head].concat(body).map(row => row.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(',')).join('\n');
      const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); const a = document.createElement('a'); a.href = url; a.download = 'vietpay-commission-report.csv'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); this.toast('Commission report exported');
    };
    const regionData = Object.keys(REG).map(code => {
      const list = mapPool.filter(m => m.region === code);
      const provs = {};
      list.forEach(m => { provs[m.province] = (provs[m.province] || 0) + 1; });
      return { code: code, name: REG[code], count: list.length, provinces: Object.keys(provs).map(p => ({ name: p, count: provs[p] })) };
    });
    const maxRegion = Math.max(1, ...regionData.map(r => r.count));
    const heatColor = (n) => { const ratio = n / maxRegion; return ratio > 0.66 ? '#0D3C7D' : ratio > 0.33 ? '#0073BF' : '#BFE0F5'; };
    const mapList = mapPool.filter(m => !st.mapRegion || m.region === st.mapRegion);
    const rangeDefs = [
      { id: 'today', label: 'Today (Jan 20, 2026)' },
      { id: '7d', label: 'Last 7 days' },
      { id: '30d', label: 'Last 30 days' },
      { id: 'month', label: 'This month (Jan 2026)' },
      { id: 'custom', label: 'Custom range…' }
    ];
    const rangeLabel = st.range === 'custom'
      ? (st.rangeFrom || '—') + ' → ' + (st.rangeTo || '—')
      : (rangeDefs.find(r => r.id === st.range) || rangeDefs[3]).label;
    const kpiDefs = {
      total: { title: 'All registered businesses', test: (m) => m.status === 'APPROVED' },
      approved: { title: 'Active businesses', test: (m) => m.status === 'APPROVED' && (m.businessStatus || 'ACTIVE') === 'ACTIVE' },
      pending: { title: 'Pending approvals', test: (m) => m.status === 'PENDING' },
      rejected: { title: 'Commission earned', test: () => false }
    };
    const mt = st.modal ? st.modal.type : null;
    const dk = st.drawer ? kpiDefs[st.drawer] : null;
    const dq = st.drawerSearch.trim().toLowerCase();
    const drawerAll = dk ? all.filter(m => dk.test(m)
      && (st.drawerSource === 'All sources' || m.source === st.drawerSource)
      && (st.drawerRegion === 'All regions' || m.region === st.drawerRegion)
      && (!dq || (m.name + ' ' + m.mid + ' ' + m.province).toLowerCase().includes(dq))) : [];
    const perPage = 5;
    const pages = Math.max(1, Math.ceil(drawerAll.length / perPage));
    const page = Math.min(st.drawerPage, pages - 1);
    const pageRows = drawerAll.slice(page * perPage, page * perPage + perPage);
    const pgBtn = (on) => 'background:transparent;font-family:inherit;border:1px solid ' + (on ? '#DFDFDF' : '#EDEDED') + ';border-radius:6px;padding:8px 14px;color:' + (on ? '#373A36' : '#B7B9B6') + ';cursor:' + (on ? 'pointer' : 'default');
    const openKpi = (k) => () => this.setState({ drawer: k, drawerPage: 0, drawerSearch: '', drawerSource: 'All sources', drawerRegion: 'All regions' });
    const av = st.apvId ? st.apps.find(x => x.id === st.apvId) : null;
    const avMiss = this.apvMissing(av);
    const avOpen = !!av && this.isOpenStatus(av.status);
    const avBlocked = avOpen && avMiss.length > 0;
    const pushNotif = (s2, title, body) => [{ id: 'n' + Date.now(), title: title, body: body, ts: 'Just now', read: false }].concat(s2.notifications);
    const patchApp = (s2, id, patch, ev) => s2.apps.map(x => x.id === id ? Object.assign({}, x, patch, { audit: x.audit.concat([ev]) }) : x);
    const approveApv = () => {
      if (!av || avBlocked) return;
      const id = av.id, now = this.nowStamp(), src = av;
      const merchant = {
        id: 'apv-' + id, initial: (src.name || '?').charAt(0).toUpperCase(), name: src.name, mid: src.mid,
        entity: src.entity, source: src.source, status: 'APPROVED', date: src.date, phone: src.phone,
        businessStatus: 'ACTIVE', tid: '', posDevice: '', posSerial: '',
        email: src.email, kyc: src.kyb === 'Valid' ? 'Valid' : 'Pending', province: src.province, city: src.city,
        regCode: src.regCode, branchCode: src.branchCode, branchName: src.branchName, region: src.region,
        cif: src.cif, mcc: src.mcc, address: src.address, trading: src.trading, descEn: src.descEn,
        descVi: src.descVi, actEn: src.actEn, actVi: src.actVi,
        link: { registered: !!src.plEnabled, enabled: false, paySource: src.channel, feeType: src.feeType, feeValue: src.feeValue, validity: src.validity, allowCancel: src.allowCancel, require3ds: true },
        audit: (src.audit || []).concat([{ ts: now, actor: 'Duy Nguyen', action: 'Approval granted — merchant created', status: 'Approved' }])
      };
      this.setState(s2 => ({
        modal: null, reason: '', reasonError: false,
        apps: patchApp(s2, id, { status: 'APPROVED', updatedOn: now, reason: '', docsUpdated: false }, { ts: now, actor: 'Duy Nguyen', action: 'Approved — merchant ' + src.mid + ' created', status: 'Approved' }),
        merchants: [merchant].concat(s2.merchants),
        notifications: pushNotif(s2, 'Merchant approved', src.name + ' is now registered — ' + src.mid + '. Assign a POS terminal to issue a TID.')
      }));
      this.toast('Approved ' + src.name + ' — added to Businesses; POS not assigned');
    };
    const rejectApv = () => {
      if (!av) return;
      if (!st.reason.trim()) { this.setState({ reasonError: true }); return; }
      const id = av.id, why = st.reason.trim(), now = this.nowStamp(), nm = av.name;
      this.setState(s2 => ({
        modal: null, reason: '', reasonError: false,
        apps: patchApp(s2, id, { status: 'REJECTED', updatedOn: now, reason: why }, { ts: now, actor: 'Duy Nguyen', action: 'Rejected — ' + why, status: 'Rejected' }),
        notifications: pushNotif(s2, 'Application rejected', nm + ' — ' + why)
      }));
      this.toast('Rejected ' + nm + ' (demo)');
    };
    const rcPicked = Object.keys(st.rcSel).filter(k => st.rcSel[k]);
    const sendChanges = () => {
      if (!av) return;
      if ((!rcPicked.length && !st.rcNote.trim()) || (rcPicked.includes('Additional images: Other (describe below)') && !st.rcNote.trim())) { this.setState({ rcError: true }); return; }
      const id = av.id, now = this.nowStamp(), nm = av.name;
      const summary = (rcPicked.length ? rcPicked.join(' · ') : '') + (st.rcNote.trim() ? (rcPicked.length ? ' — ' : '') + st.rcNote.trim() : '');
      this.setState(s2 => ({
        rcOpen: false, rcSel: {}, rcNote: '', rcError: false,
        apps: patchApp(s2, id, { status: 'CHANGES REQUESTED', updatedOn: now, reason: summary, additionalImagesRequired: rcPicked.some(item => item.startsWith('Additional images:')), requestedItems: rcPicked }, { ts: now, actor: 'Duy Nguyen', action: 'Changes requested — ' + summary, status: 'Changes requested' }),
        notifications: pushNotif(s2, 'Changes requested', nm + ' — ' + summary)
      }));
      this.toast('Change request sent to the maker (demo)');
    };
    const disableLink = () => {
      this.setState(s2 => ({ modal: null, linkDraft: Object.assign({}, s2.linkDraft, { enabled: false }) }));
      this.toast('Payment Link switched off — remember to save');
    };
    const decide = (approve) => {
      if (!approve && !st.reason.trim()) { this.setState({ reasonError: true }); return; }
      const id = st.modal && st.modal.id;
      const m = st.merchants.find(x => x.id === id);
      const status = approve ? 'APPROVED' : 'REJECTED';
      const note = approve ? 'Merchant approved' : 'Merchant rejected — ' + st.reason.trim();
      this.setState(s2 => ({
        modal: null, reason: '', reasonError: false,
        merchants: s2.merchants.map(x => x.id === id ? Object.assign({}, x, {
          status: status,
          audit: x.audit.concat([{ ts: 'Just now', actor: 'Duy Nguyen', action: note, status: approve ? 'Approved' : 'Rejected' }])
        }) : x),
        notifications: [{ id: 'n' + Date.now(), title: approve ? 'Merchant approved' : 'Merchant rejected', body: m.name + ' (' + m.mid + ')' + (approve ? ' is now active.' : ' — ' + s2.reason.trim()), ts: 'Just now', read: false }].concat(s2.notifications)
      }));
      this.toast((approve ? 'Approved ' : 'Rejected ') + m.name + ' (demo)');
    };
    // ================= Transactions =================
    const txnAll = this.txns || (this.txns = this.seedTxns());
    const tf = st.txnFilters, tdf = st.txnDraftF;
    const registrations = this.txnRegistrations();
    const registeredMerchants = registrations.filter(m => (st.txnSrc === 'all' || m.source === st.txnSrc) && (tdf.source === 'All' || m.source === tdf.source));
    const selectedMerchants = registeredMerchants.filter(m => tdf.merchant === 'All' || m.mid === tdf.merchant);
    const registeredServices = [...new Set(selectedMerchants.flatMap(m => m.services))];
    const registeredDevices = selectedMerchants.flatMap(m => m.devices.filter(d => tdf.service === 'All' || d.service === tdf.service).map(d => ({ id: d.id, label: d.id + ' · ' + m.name + ' · ' + d.service })));
    const deviceQuery = (st.txnDeviceSearch || '').trim().toLowerCase();
    const deviceOptions = registeredDevices.filter(d => d.label.toLowerCase().includes(deviceQuery));
    const setTxnScope = (key) => (e) => { const value = e.target.value; this.setState(s2 => ({ txnDeviceOpen: false, txnDeviceSearch: '', txnDraftF: Object.assign({}, s2.txnDraftF, { [key]: value, deviceId: '' }, key === 'service' ? {} : { service: 'All' }, key === 'source' ? { merchant: 'All' } : {}) })); };
    const tq = st.txnSearch.trim().toLowerCase();
    const TAB_STATUS = { authorized: 'AUTHORIZED', settled: 'SETTLED', refund: 'REFUNDED', unsuccessful: 'FAILED' };
    const txnBase = txnAll.filter(x => {
      if (st.txnSrc !== 'all' && x.source !== st.txnSrc) return false;
      if (tq && (x.id + ' ' + x.order + ' ' + x.merchant + ' ' + x.mid + ' ' + x.card).toLowerCase().indexOf(tq) === -1) return false;
      if (tf.merchant !== 'All' && x.mid !== tf.merchant) return false;
      if (tf.from && x.date < tf.from) return false;
      if (tf.to && x.date > tf.to) return false;
      if (tf.paymentType !== 'All' && (x.method === 'qr' ? 'QR' : 'Card') !== tf.paymentType) return false;
      if (tf.service !== 'All' && x.channel !== tf.service) return false;
      if (tf.deviceId && x.terminal !== tf.deviceId) return false;
      if (tf.method !== 'All' && x.method !== tf.method) return false;
      if (tf.source !== 'All' && x.source !== tf.source) return false;
      if (tf.min && x.amount < parseFloat(tf.min)) return false;
      if (tf.max && x.amount > parseFloat(tf.max)) return false;
      return true;
    });
    const txnByTab = (tab) => txnBase.filter(x => x.status === TAB_STATUS[tab]);
    const txnList = txnByTab(st.txnTab).slice().sort((x, y) => (y.date + y.time) > (x.date + x.time) ? 1 : -1);
    const txnTotal = txnList.length;
    const txnPages = Math.max(1, Math.ceil(txnTotal / st.txnPer));
    const txnPageIdx = Math.min(st.txnPage, txnPages - 1);
    const txnSlice = txnList.slice(txnPageIdx * st.txnPer, txnPageIdx * st.txnPer + st.txnPer);
    const txStatusChip = (v) => v === 'AUTHORIZED' || v === 'SETTLED' ? chip('#DCEEE4', '#2E7D5B')
      : v === 'REFUNDED' ? chip('#FBEED1', '#B27C12') : chip('#BFE0F5', '#0D3C7D');
    const srcChip = (v) => v === 'VIETPAY' ? 'display:inline-flex;border-radius:4px;background:#BFE0F5;color:#0D3C7D;font-size:11px;font-weight:700;padding:4px 8px'
      : 'display:inline-flex;border-radius:4px;background:#EAE0FB;color:#6B339E;font-size:11px;font-weight:700;padding:4px 8px';
    const METH = {
      qr: { label: 'QR', name: 'QR', box: 'display:inline-flex;align-items:center;justify-content:center;width:34px;height:22px;border-radius:4px;background:#EAF6FD;color:#0D3C7D;font-size:11px;font-weight:700;white-space:nowrap' },
      visa: { label: 'VISA', name: 'Visa', box: 'display:inline-flex;align-items:center;justify-content:center;width:34px;height:22px;border-radius:4px;background:#1A1F71;color:#fff;font-size:9px;font-weight:700;letter-spacing:0.5px' },
      mc: { label: 'MC', name: 'Mastercard', box: 'display:inline-flex;align-items:center;justify-content:center;width:34px;height:22px;border-radius:4px;background:#F5F5F4;border:1px solid #DFDFDF;font-size:9px;font-weight:700;color:#373A36' },
      napas: { label: 'N', name: 'Napas', box: 'display:inline-flex;align-items:center;justify-content:center;width:34px;height:22px;border-radius:4px;background:#0F9D58;color:#fff;font-size:11px;font-weight:700' }
    };
    const TAB_CTX = { authorized: '', settled: 'Settlement Date', refund: 'Refunded On', unsuccessful: 'Decline Reason' };
    const ctxLabel = TAB_CTX[st.txnTab];
    const ctxVal = (x) => st.txnTab === 'unsuccessful' ? (x.reason || '—') : (x.settled ? this.fmtDate(x.settled) : 'Pending');
    const txnSum = txnList.reduce((a, x) => a + x.amount, 0);
    const reasonTally = {};
    txnList.forEach(x => { if (x.reason) reasonTally[x.reason] = (reasonTally[x.reason] || 0) + 1; });
    const topReason = Object.keys(reasonTally).sort((a, b) => reasonTally[b] - reasonTally[a])[0];
    const pendingSettle = txnByTab('authorized').length;
    const txnStats = [
      { key: 's1', label: 'Transactions', value: String(txnTotal) },
      { key: 's2', label: st.txnTab === 'refund' ? 'Total refunded' : st.txnTab === 'unsuccessful' ? 'Value declined' : 'Total value', value: this.fmtVnd(txnSum) },
      { key: 's3', label: 'Average ticket', value: txnTotal ? this.fmtVnd(Math.round(txnSum / txnTotal)) : '—' },
      st.txnTab === 'unsuccessful'
        ? { key: 's4', label: 'Most common reason', value: topReason || '—' }
        : st.txnTab === 'settled' ? { key: 's4', label: 'Awaiting settlement', value: pendingSettle + ' txns' }
        : st.txnTab === 'refund' ? { key: 's4', label: 'Refund rate', value: txnBase.length ? ((txnTotal / txnBase.length) * 100).toFixed(1) + '%' : '—' }
        : { key: 's4', label: 'Awaiting settlement', value: txnTotal + ' txns' }
    ];
    const txnRows = txnSlice.map(x => ({
      key: x.id, id: x.id, order: x.order, mid: x.mid, merchant: x.merchant, ctx: ctxVal(x),
      source: x.source === 'VIETPAY' ? 'VietPay' : 'PVCB', sourceStyle: srcChip(x.source),
      isMc: x.method === 'mc', notMc: x.method !== 'mc', methLabel: METH[x.method].label, methBox: METH[x.method].box, methName: METH[x.method].name,
      amount: this.fmtVnd(x.amount), status: x.status, statusStyle: txStatusChip(x.status),
      date: this.fmtDate(x.date), time: x.time, card: x.card ? '•••• ' + x.card : '—', auth: x.auth,
      terminal: x.terminal, channel: x.channel,
      open: () => this.setState({ txnView: x })
    }));
    const tv = st.txnView;
    const setTd = (k) => (e) => { const val = e.target.value; this.setState(s2 => ({ txnDraftF: Object.assign({}, s2.txnDraftF, { [k]: val }) })); };
    const tLabels = { from: 'From', to: 'To', merchant: 'Merchant', paymentType: 'Payment type', service: 'Device / service', deviceId: 'Device ID', method: 'Method', source: 'Source', min: 'Min amount', max: 'Max amount' };
    const txnChips = [];
    Object.keys(tLabels).forEach(k => {
      const val = tf[k];
      if (val && val !== 'All') txnChips.push({
        key: k, text: tLabels[k] + ': ' + (k === 'method' ? METH[val].name : k === 'merchant' ? (registrations.find(m => m.mid === val) || { name: val }).name : val),
        clear: () => this.setState(s2 => {
          const blankVal = this.blankTxn()[k];
          return { txnPage: 0, txnFilters: Object.assign({}, s2.txnFilters, { [k]: blankVal }), txnDraftF: Object.assign({}, s2.txnDraftF, { [k]: blankVal }) };
        })
      });
    });
    const txnHead = 'text-align:left;padding:0 12px;height:44px;font-size:12px;font-weight:700;color:#474A45;background:#F5F5F4;position:sticky;top:0;z-index:2;white-space:nowrap;border-bottom:1px solid #EDEDED';
    const exportTxn = () => {
      const cols = [['Transaction ID', x => x.id], ['Order ID', x => x.order], ['Merchant Name', x => x.merchant], ['Source', x => x.source],
        ['MID', x => x.mid], ['Method', x => METH[x.method].name], ['Amount (VND)', x => x.amount], ['Status', x => x.status],
        ['Date', x => x.date], ['Time', x => x.time], ['Card', x => x.card ? '**** ' + x.card : '—'], ['Auth Code', x => x.auth],
        ['Terminal', x => x.terminal], ['Channel', x => x.channel], ['Decline reason', x => x.reason]];
      window.MMSFinance.queue(this, 'Transactions', cols.map(c=>c[0]), txnList.map(x=>cols.map(c=>c[1](x))), 'csv', {from:tf.from||txnList.map(x=>x.date).sort()[0],to:tf.to||txnList.map(x=>x.date).sort().slice(-1)[0],entity:st.txnSrc==='PVCOM'?'PVCB':st.txnSrc==='all'?'ALL':st.txnSrc});
    };
    // ================= Payouts =================
    const poStatusChip = (s2) => s2 === 'COMPLETED' ? chip('#DCEEE4', '#2E7D5B') : s2 === 'PENDING' ? chip('#FBEED1', '#B27C12') : s2 === 'PROCESSING' ? chip('#EAF6FD', '#0073BF') : chip('#FEE2E2', '#B91C1C');
    const pf = st.poFilters, pd = st.poDraftPo;
    const pc = isTablet ? Object.assign({}, st.poCols, { gross: false, fees: false, period: false, bankref: false, sdate: false, count: false, other: false, account: false, holder: false, mid: false, entity: false, bank: false }) : Object.assign({ mid: true }, st.poCols);
    const poW = isTablet
      ? { id: '0px', merch: '240px', net: '150px', date: '120px', status: '130px', act: '56px' }
      : { id: '0px', merch: '300px', net: '170px', date: '150px', status: '140px', act: '70px' };
    const poBase = st.payouts.filter(p => st.poSrc === 'all' ? true : p.entity === st.poSrc);
    const poQ = st.poSearch.trim().toLowerCase();
    const poFiltered = poBase.filter(p => {
      if (poQ && (p.id + ' ' + p.merchant + ' ' + p.mid + ' ' + p.bankRef).toLowerCase().indexOf(poQ) === -1) return false;
      if (pf.pFrom && p.pdate < pf.pFrom) return false;
      if (pf.pTo && p.pdate > pf.pTo) return false;
      if (pf.sFrom && p.sdate < pf.sFrom) return false;
      if (pf.sTo && p.sdate > pf.sTo) return false;
      if (pf.merchant && p.merchant.toLowerCase().indexOf(pf.merchant.toLowerCase()) === -1) return false;
      if (pf.entity !== 'All' && p.entity !== pf.entity) return false;
      if (pf.status !== 'All' && p.status !== pf.status) return false;
      if (pf.bank !== 'All' && p.bank !== pf.bank) return false;
      if (pf.channel !== 'All' && p.channels.toLowerCase().indexOf(pf.channel.toLowerCase()) === -1) return false;
      if (pf.min && p.net < parseFloat(pf.min)) return false;
      if (pf.max && p.net > parseFloat(pf.max)) return false;
      return true;
    });
    const poOrder = { PENDING: 0, PROCESSING: 1, COMPLETED: 2, FAILED: 3 };
    const poSorted = poFiltered.slice().sort((a, b) => {
      const k = pf.sortBy, dirMul = pf.dir === 'asc' ? 1 : -1;
      let cmp = 0;
      if (k === 'net') cmp = a.net - b.net;
      else if (k === 'merchant') cmp = a.merchant.localeCompare(b.merchant);
      else if (k === 'status') cmp = poOrder[a.status] - poOrder[b.status];
      else cmp = (a.pdate + a.ptime) < (b.pdate + b.ptime) ? -1 : (a.pdate + a.ptime) > (b.pdate + b.ptime) ? 1 : 0;
      return cmp * dirMul;
    });
    const poTotal = poSorted.length;
    const poPages = Math.max(1, Math.ceil(poTotal / st.poPer));
    const poPageIdx = Math.min(st.poPage, poPages - 1);
    const poSlice = poSorted.slice(poPageIdx * st.poPer, poPageIdx * st.poPer + st.poPer);
    const poSelIds = Object.keys(st.poSel).filter(k => st.poSel[k] && poSorted.some(p => p.id === k));
    const poTot = st.poSrc === 'VIETPAY'
      ? { net: 14412240000, cN: 702, cV: 13760600000, pN: 24, pV: 570640000, fN: 3, fV: 81000000 }
      : st.poSrc === 'PVCOM'
      ? { net: 10448180000, cN: 502, cV: 9979500000, pN: 18, pV: 414680000, fN: 3, fV: 54000000 }
      : { net: 24860420000, cN: 1204, cV: 23740100000, pN: 42, pV: 985320000, fN: 6, fV: 135000000 };
    const poSetStatus = (v) => () => this.setState(s2 => ({ poPage: 0, poFilters: Object.assign({}, s2.poFilters, { status: v }), poDraftPo: Object.assign({}, s2.poDraftPo, { status: v }) }));
    const poCards = [
      { key: 'c1', label: 'Total net payout', amount: this.fmtDong(poTot.net), sub: (poTot.cN + poTot.pN + poTot.fN).toLocaleString('en-US') + ' payouts in range', accent: '#1C1D1B', pick: poSetStatus('All'), on: pf.status === 'All' },
      { key: 'c2', label: 'Completed', amount: this.fmtDong(poTot.cV), sub: poTot.cN.toLocaleString('en-US') + ' payouts', accent: '#2E7D5B', pick: poSetStatus('COMPLETED'), on: pf.status === 'COMPLETED' },
      { key: 'c3', label: 'Pending', amount: this.fmtDong(poTot.pV), sub: poTot.pN + ' payouts', accent: '#B27C12', pick: poSetStatus('PENDING'), on: pf.status === 'PENDING' },
      { key: 'c4', label: 'Failed', amount: this.fmtDong(poTot.fV), sub: poTot.fN + ' payouts', accent: '#B91C1C', pick: poSetStatus('FAILED'), on: pf.status === 'FAILED' }
    ].map(c => Object.assign(c, {
      style: 'text-align:left;font-family:inherit;cursor:pointer;display:flex;flex-direction:column;gap:6px;min-width:0;border-radius:6px;padding:16px 18px;background:#fff;border:' + (c.on ? '1.5px solid #0073BF' : '1px solid #DFDFDF'),
      labelStyle: 'font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:' + c.accent,
      amountStyle: 'font-size:' + (c.key === 'c1' ? '22px' : '19px') + ';color:#1C1D1B;letter-spacing:-0.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis'
    }));
    const poColDefs = [
      { g: 'Payout identity' }, { k: 'id', label: 'Payout ID', req: true }, { k: 'bankref', label: 'Bank Reference' }, { k: 'status', label: 'Status', req: true },
      { g: 'Merchant' }, { k: 'merchant', label: 'Merchant', req: true }, { k: 'mid', label: 'MID', req: true }, { k: 'entity', label: 'Entity' },
      { g: 'Settlement' }, { k: 'period', label: 'Settlement Period' }, { k: 'sdate', label: 'Settlement Date' }, { k: 'count', label: 'Transaction Count' },
      { g: 'Amount' }, { k: 'gross', label: 'Gross Amount' }, { k: 'fees', label: 'Transaction Fees' }, { k: 'other', label: 'Other Adjustments' }, { k: 'net', label: 'Net Payout', req: true },
      { g: 'Destination' }, { k: 'pdate', label: 'Payout Date', req: true }, { k: 'bank', label: 'Destination Bank' }, { k: 'account', label: 'Bank Account' }, { k: 'holder', label: 'Account Holder' }
    ];
    const poColItems = poColDefs.map((c, i) => c.g ? {
      key: 'g' + i, isHeader: true, isCol: false, label: c.g
    } : {
      key: c.k, isHeader: false, isCol: true, label: c.label + (c.req ? ' \u00b7 required' : ''),
      glyph: c.req || pc[c.k] ? '\u2713' : '',
      style: 'text-align:left;font-family:inherit;display:flex;align-items:center;justify-content:space-between;gap:10px;border:none;background:transparent;border-radius:6px;padding:8px 10px;font-size:13px;font-weight:600;cursor:' + (c.req ? 'not-allowed' : 'pointer') + ';color:' + (c.req ? '#B7B9B6' : (pc[c.k] ? '#0073BF' : '#373A36')),
      toggle: () => { if (c.req) { this.toast('This column is required and cannot be hidden'); return; } this.setState(s2 => ({ poCols: Object.assign({}, s2.poCols, { [c.k]: !s2.poCols[c.k] }) })); }
    });
    const poChipDefs = [
      { k: 'pFrom', text: 'Payout from ' + pf.pFrom }, { k: 'pTo', text: 'Payout to ' + pf.pTo },
      { k: 'sFrom', text: 'Settled from ' + pf.sFrom }, { k: 'sTo', text: 'Settled to ' + pf.sTo },
      { k: 'merchant', text: 'Merchant: ' + pf.merchant }, { k: 'min', text: 'Min ' + pf.min }, { k: 'max', text: 'Max ' + pf.max },
      { k: 'entity', text: 'Entity: ' + (pf.entity === 'PVCOM' ? 'PVcomBank' : 'VietPay'), sel: true },
      { k: 'status', text: 'Status: ' + pf.status, sel: true }, { k: 'bank', text: 'Bank: ' + pf.bank, sel: true },
      { k: 'channel', text: 'Channel: ' + pf.channel, sel: true }
    ].filter(c => c.sel ? pf[c.k] !== 'All' : !!pf[c.k]);
    const poChips = poChipDefs.map(c => ({
      key: c.k, text: c.text,
      clear: () => this.setState(s2 => {
        const blankVal = c.sel ? 'All' : '';
        return { poPage: 0, poFilters: Object.assign({}, s2.poFilters, { [c.k]: blankVal }), poDraftPo: Object.assign({}, s2.poDraftPo, { [c.k]: blankVal }) };
      })
    }));
    const setPd = (k) => (e) => { const v = e.target.value; this.setState(s2 => ({ poDraftPo: Object.assign({}, s2.poDraftPo, { [k]: v }) })); };
    const poSortHead = (k, label, w, align) => ({
      label: label + (pf.sortBy === k ? (pf.dir === 'asc' ? ' \u2191' : ' \u2193') : ''),
      sort: pf.sortBy === k ? (pf.dir === 'asc' ? 'ascending' : 'descending') : 'none',
      click: () => this.setState(s2 => ({
        poPage: 0,
        poFilters: Object.assign({}, s2.poFilters, { sortBy: k, dir: s2.poFilters.sortBy === k && s2.poFilters.dir === 'desc' ? 'asc' : 'desc' }),
        poDraftPo: Object.assign({}, s2.poDraftPo, { sortBy: k, dir: s2.poFilters.sortBy === k && s2.poFilters.dir === 'desc' ? 'asc' : 'desc' })
      }))
    });
    const poRows = poSlice.map(p => ({
      key: p.id, id: p.id, merchant: p.merchant, mid: p.mid,
      entity: p.entity === 'VIETPAY' ? 'VietPay' : 'PVcomBank', entityStyle: srcChip(p.entity),
      period: p.period, sdate: this.fmtDate(p.sdate), count: String(p.count),
      gross: this.fmtDong(p.gross), fees: this.fmtDong(p.fees),
      other: p.otherAdj ? this.fmtDong(p.otherAdj) : '\u2014',
      net: this.fmtDong(p.net), pdate: this.fmtDate(p.pdate), ptime: p.ptime,
      bank: p.bank, account: p.account, holder: p.holder, bankRef: p.bankRef,
      status: p.status, statusStyle: poStatusChip(p.status),
      sel: !!st.poSel[p.id],
      rowStyle: 'cursor:pointer;background:' + (st.poSel[p.id] ? '#EAF6FD' : '#fff'),
      toggleSel: () => this.setState(s2 => ({ poSel: Object.assign({}, s2.poSel, { [p.id]: !s2.poSel[p.id] }) })),
      stopClick: (e) => { if (e && e.stopPropagation) e.stopPropagation(); },
      open: () => this.setState({ poView: p.id }),
      onKey: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.setState({ poView: p.id }); } }
    }));
    const poRangeFrom = pf.pFrom || (poSorted.length ? poSorted.map(p => p.pdate).sort()[0] : '2026-08-01');
    const poRangeTo = pf.pTo || (poSorted.length ? poSorted.map(p => p.pdate).sort().slice(-1)[0] : '2026-08-20');
    const poFileBase = 'Payouts_' + poRangeFrom + '_to_' + poRangeTo + '_20260820';
    const poExportRows = () => poSelIds.length ? poSorted.filter(p => poSelIds.indexOf(p.id) !== -1) : poSorted;
    const poExport = (ext) => () => {
      const rows = poExportRows();
      this.setState({ poExportOpen: false });
      window.MMSFinance.queue(this, 'Payouts', ['Payout ID','Merchant','MID','Entity','Gross (VND)','Fees (VND)','Net (VND)','Date','Status'], rows.map(p=>[p.id,p.merchant,p.mid,p.entity,p.gross,p.fees,p.net,p.pdate,p.status]), ext, {from:poRangeFrom,to:poRangeTo,entity:st.poSrc==='PVCOM'?'PVCB':st.poSrc==='all'?'ALL':st.poSrc});
    };
    const pv = st.poView ? st.payouts.find(p => p.id === st.poView) : null;
    const poHead = 'padding:0 12px;height:44px;text-align:left;white-space:nowrap;border-bottom:1px solid #EDEDED;font-size:12px;font-weight:700;color:#474A45;background:#F5F5F4;position:sticky;top:0;z-index:3';
    const poCell = 'padding:0 12px;height:56px;border-bottom:1px solid #EDEDED;font-size:13px;color:#373A36;white-space:nowrap;overflow:hidden;text-overflow:ellipsis';
    // ================= Approvals =================
    const apvF = st.apvFilters, apvD = st.apvDraftF;
    const apvq = st.apvSearch.trim().toLowerCase();
    const apvBase = st.apps.filter(x => {
      if (st.apvSrc === 'VIETPAY' && x.source !== 'VIETPAY') return false;
      if (st.apvSrc === 'PVCOM' && x.source !== 'PVCOM') return false;
      if (apvq && (x.name + ' ' + x.gatewayId + ' ' + x.mid + ' ' + x.regCode).toLowerCase().indexOf(apvq) === -1) return false;
      if (apvF.from && x.date < apvF.from) return false;
      if (apvF.to && x.date > apvF.to) return false;
      if (apvF.customerType !== 'All' && x.customerType !== apvF.customerType) return false;
      if (apvF.source !== 'All' && x.source !== apvF.source) return false;
      if (apvF.ekyc !== 'All' && x.ekyc !== apvF.ekyc) return false;
      if (apvF.kyb !== 'All' && x.kyb !== apvF.kyb) return false;
      if (apvF.status !== 'All' && x.status !== apvF.status) return false;
      if (apvF.maker !== 'All' && x.maker !== apvF.maker) return false;
      if (apvF.checker !== 'All' && (x.checker || 'Unassigned') !== apvF.checker) return false;
      return true;
    });
    const apvByTab = (tab) => apvBase.filter(x => tab === 'all' ? true
      : tab === 'pending' ? this.isOpenStatus(x.status)
      : tab === 'rejected' ? x.status === 'REJECTED' : x.status === 'APPROVED');
    const apvSortKey = (x) => st.apvSort === 'name' ? x.name.toLowerCase()
      : st.apvSort === 'updated' ? (x.updatedOn || '')
      : st.apvSort === 'status' ? x.status : x.date + ' ' + (x.updatedOn || '');
    const apvDir = st.apvDirDesc ? -1 : 1;
    const apvList = apvByTab(st.apvTab).slice().sort((x, y) => apvSortKey(x) > apvSortKey(y) ? apvDir : apvSortKey(x) < apvSortKey(y) ? -apvDir : 0);
    const apvTotal = apvList.length;
    const apvPages = Math.max(1, Math.ceil(apvTotal / st.apvPer));
    const apvPageIdx = Math.min(st.apvPage, apvPages - 1);
    const apvSlice = apvList.slice(apvPageIdx * st.apvPer, apvPageIdx * st.apvPer + st.apvPer);
    const cw = st.apvCols;
    const colCustomer = cw.customer && isDesk, colEkyc = cw.ekyc && isDesk, colKyb = cw.kyb,
      colMaker = cw.maker && isDesk, colChecker = cw.checker && isDesk,
      colSubmitted = cw.submitted && isDesk, colUpdated = cw.updated && isDesk, colReason = cw.reason && isDesk;
    const colExpand = isTablet;
    const rowSpan = 4 + [colCustomer, colEkyc, colKyb, colMaker, colChecker, colSubmitted, colUpdated, colReason, colExpand].filter(Boolean).length;
    const uniq = (arr) => arr.filter((v, i) => arr.indexOf(v) === i);
    const makerOpts = ['All'].concat(uniq(st.apps.map(x => x.maker)).sort());
    const checkerOpts = ['All'].concat(uniq(st.apps.map(x => x.checker || 'Unassigned')).sort());
    const setApvD = (k) => (e) => { const v = e.target.value; this.setState(s2 => ({ apvDraftF: Object.assign({}, s2.apvDraftF, { [k]: v }) })); };
    const apvLabels = { from: 'Submitted from', to: 'Submitted to', customerType: 'Customer type', source: 'Source', ekyc: 'eKYC', kyb: 'KYB', status: 'Approval status', maker: 'Maker', checker: 'Checker' };
    const apvChips = [];
    Object.keys(apvLabels).forEach(k => {
      const v = apvF[k];
      if (v && v !== 'All') apvChips.push({
        key: k, text: apvLabels[k] + ': ' + v,
        clear: () => this.setState(s2 => {
          const blankVal = (k === 'from' || k === 'to') ? '' : 'All';
          return { apvPage: 0, apvFilters: Object.assign({}, s2.apvFilters, { [k]: blankVal }), apvDraftF: Object.assign({}, s2.apvDraftF, { [k]: blankVal }) };
        })
      });
    });
    const ekycChip = (v) => v === 'Valid' ? chip('#DCEEE4', '#2E7D5B') : v === 'Failed' ? chip('#BFE0F5', '#0D3C7D') : chip('#FBEED1', '#B27C12');
    const docChip = (v) => v === 'Verified' ? chip('#DCEEE4', '#2E7D5B')
      : v === 'Pending' ? chip('#FBEED1', '#B27C12')
      : v === 'Replaced' ? chip('#EAF6FD', '#0073BF') : chip('#BFE0F5', '#0D3C7D');
    const flagOf = (x) => {
      if (!this.isOpenStatus(x.status)) return [];
      const flags = [];
      const add = (text, title) => flags.push({ key: text, text, title: title || text, style: 'display:block;font-size:12px;font-weight:400;color:#696B68;line-height:1.5;white-space:normal;text-transform:none;letter-spacing:normal' });
      if (!x.checker) add('Pending checker', 'Waiting for a checker to be assigned');
      if (x.ekyc !== 'Valid') add('Pending KYC', 'KYC status: ' + x.ekyc);
      if (x.kyb !== 'Valid') add('Pending KYB', 'KYB status: ' + x.kyb);
      if (x.additionalImagesRequired) add('Additional images required', x.reason);
      if (x.status === 'CHANGES REQUESTED' && !x.additionalImagesRequired) add('Changes requested', x.reason);
      this.apvMissing(x).filter(item => item !== 'eKYC verification' && item !== 'KYB verification').forEach(item => add('Pending ' + item.toLowerCase()));
      if (x.docsUpdated) add('Document updated', 'Re-review the updated document');
      if (!flags.length) add('Pending approval', 'Ready for the approval decision');
      return flags;
    };
    const reasonOf = (x) => x.status === 'APPROVED' ? 'Not applicable' : (x.reason || '—');
    const cellPad = 'padding:13px 12px;font-size:13px;color:#373A36;white-space:nowrap;vertical-align:top';
    const stickyHead = 'text-align:left;padding:13px 12px;font-size:11px;font-weight:700;color:#696B68;letter-spacing:0.4px;text-transform:uppercase;background:#F5F5F4;position:sticky;top:0;z-index:2;white-space:nowrap';
    const sortHead = (key) => stickyHead + ';cursor:pointer;color:' + (st.apvSort === key ? '#0073BF' : '#696B68');
    const apvSortGlyph = (key) => st.apvSort === key ? (st.apvDirDesc ? ' ↓' : ' ↑') : '';
    const pickSort = (key) => () => this.setState(s2 => ({ apvSort: key, apvDirDesc: s2.apvSort === key ? !s2.apvDirDesc : true, apvPage: 0 }));
    const apvRows = apvSlice.map(x => {
      const flag = flagOf(x), open = st.apvExpand === x.id;
      return {
        key: x.id, id: x.id, name: x.name, gateway: x.gatewayId, mid: x.mid,
        customerType: x.customerType, source: x.source, sourceStyle: typeChip(x.source),
        ekyc: x.ekyc, ekycStyle: ekycChip(x.ekyc), kyb: x.kyb, kybStyle: ekycChip(x.kyb),
        maker: x.maker, checker: x.checker || 'Unassigned',
        checkerStyle: 'font-size:13px;white-space:nowrap;color:' + (x.checker ? '#373A36' : '#B27C12') + ';font-weight:' + (x.checker ? '400' : '600'),
        submitted: this.fmtDate(x.date), updated: this.fmtTs(x.updatedOn),
        status: x.status, statusStyle: statusChip(x.status),
        reason: reasonOf(x), reasonTitle: x.status === 'APPROVED' ? 'No reason required for approved requests' : (x.reason || 'No reason recorded'),
        mcc: x.mcc || '—', mccTitle: x.mcc ? (x.mcc + ' — ' + (this.mccName(x.mcc) || 'Unmapped category')) : 'MCC has not been assigned',
        flags: flag,
        flagBlock: flag.map(f => f.text).join('\n'),
        flagTitle: flag.map(f => f.text).join(' · '),
        hasFlag: flag.length > 0,
        expanded: open, span: rowSpan,
        expandGlyph: open ? '▾' : '▸',
        toggle: () => this.setState(s2 => ({ apvExpand: s2.apvExpand === x.id ? null : x.id })),
        open: () => this.openApproval(x.id)
      };
    });
    const apvPerOpts = [10, 25, 50].map(n => ({ key: n, v: String(n) }));
    const exportCsv = () => {
      const cols = [['Application ID', x => x.id], ['Business Name', x => x.name], ['Gateway ID', x => x.gatewayId], ['MID', x => x.mid],
        ['Business Registration Code', x => x.regCode], ['Customer Type', x => x.customerType], ['Source', x => x.source],
        ['eKYC Status', x => x.ekyc], ['KYB Status', x => x.kyb], ['MCC', x => x.mcc], ['Maker', x => x.maker],
        ['Checker', x => x.checker || 'Unassigned'], ['Submitted On', x => x.date], ['Updated On', x => x.updatedOn],
        ['Approval Status', x => x.status], ['Reason', x => reasonOf(x)]];
      const esc = (v) => '"' + String(v == null ? '' : v).split('"').join('""') + '"';
      const lines = [cols.map(c => esc(c[0])).join(',')].concat(apvList.map(x => cols.map(c => esc(c[1](x))).join(',')));
      const blob = new Blob(['\ufeff' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url; link.download = 'vietpay-approvals.csv';
      document.body.appendChild(link); link.click(); document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      this.toast('Exported ' + apvTotal + ' rows to CSV');
    };
    // ---- Approval detail ----
    const dv = st.docView;
    const rcOptions = av ? ['Additional images: Storefront', 'Additional images: Inside of store', 'Additional images: Other (describe below)'].concat(this.apvMissing(av), (av.documents || []).filter(dd => dd.status === 'Missing' || dd.status === 'Expired').map(dd => 'Document: ' + dd.name)) : [];
    const rcItems = uniq(rcOptions).map(labelText => ({
      key: labelText, label: labelText, on: !!st.rcSel[labelText],
      style: 'display:flex;align-items:flex-start;gap:10px;border:1px solid ' + (st.rcSel[labelText] ? '#0073BF' : '#DFDFDF') + ';border-radius:8px;padding:10px 12px;font-size:13px;color:#373A36;cursor:pointer;background:' + (st.rcSel[labelText] ? '#EAF6FD' : '#fff'),
      toggle: () => this.setState(s2 => ({ rcSel: Object.assign({}, s2.rcSel, { [labelText]: !s2.rcSel[labelText] }), rcError: false }))
    }));
    const avFeeStatus = !av ? '' : (!av.plEnabled ? 'Not requested' : (String(av.feePackage || '').trim() ? 'Complete' : 'Incomplete — no fee package assigned'));
    const v = !av ? null : {
      id: av.id, name: av.name, gateway: av.gatewayId + ' / ' + av.mid,
      status: av.status, statusStyle: statusChip(av.status),
      source: av.source, sourceStyle: typeChip(av.source),
      services: appServices(av), noServices: appServices(av).length === 0,
      submitted: this.fmtDate(av.date), updated: this.fmtTs(av.updatedOn),
      ekyc: av.ekyc, ekycStyle: ekycChip(av.ekyc), kyb: av.kyb, kybStyle: ekycChip(av.kyb),
      mcc: av.mcc || 'Not assigned',
      mccName: av.mcc ? (this.mccName(av.mcc) || 'Unmapped category') : 'MCC is mandatory before approval',
      mccOk: !!String(av.mcc || '').trim(),
      mccBadge: String(av.mcc || '').trim() ? 'COMPLETE' : 'MISSING',
      mccBadgeStyle: String(av.mcc || '').trim() ? chip('#DCEEE4', '#2E7D5B') : chip('#BFE0F5', '#0D3C7D'),
      reviewerNotes: av.reviewerNotes || 'No reviewer notes yet.',
      kycDone: av.kycDoneOn ? this.fmtTs(av.kycDoneOn) : 'Not completed',
      reason: av.status === 'APPROVED' ? 'Not applicable' : (av.reason || '—'),
      hasReason: !!av.reason || av.status === 'APPROVED',
      overview: [
        { key: 'legal', label: 'Legal business name', value: av.name },
        { key: 'trading', label: 'Trading name', value: av.trading },
        { key: 'entity', label: 'Entity type', value: av.entity },
        { key: 'ctype', label: 'Customer type', value: av.customerType },
        { key: 'reg', label: 'Business registration code', value: av.regCode },
        { key: 'gw', label: 'Gateway ID / MID', value: av.gatewayId + ' / ' + av.mid },
        { key: 'phone', label: 'Contact phone', value: av.phone },
        { key: 'email', label: 'Contact email', value: av.email },
        { key: 'addr', label: 'Registered address', value: av.address },
        { key: 'branch', label: 'Branch', value: av.branchCode + ' · ' + av.branchName },
        { key: 'maker', label: 'Maker', value: av.maker },
        { key: 'checker', label: 'Checker', value: av.checker || 'Unassigned' },
        { key: 'created', label: 'Created on', value: this.fmtDate(av.date) },
        { key: 'sub', label: 'Submitted on', value: this.fmtDate(av.date) },
        { key: 'upd', label: 'Last updated', value: this.fmtTs(av.updatedOn) }
      ],
      texts: [
        { key: 'dvi', label: 'Transaction description (VI)', value: av.descVi || 'Missing', ok: !!String(av.descVi || '').trim() },
        { key: 'den', label: 'Transaction description (EN)', value: av.descEn || 'Missing', ok: !!String(av.descEn || '').trim() },
        { key: 'avi', label: 'Business activities (VI)', value: av.actVi || 'Missing', ok: !!String(av.actVi || '').trim() },
        { key: 'aen', label: 'Business activities (EN)', value: av.actEn || 'Missing', ok: !!String(av.actEn || '').trim() }
      ].map(f => Object.assign(f, { valueStyle: 'font-size:14px;line-height:1.55;word-break:break-word;color:' + (f.ok ? '#1C1D1B' : '#0D3C7D') + ';font-weight:' + (f.ok ? '500' : '700') })),
      checklist: (av.checklist || []).map((c, i) => ({
        key: i, label: c.label, glyph: c.ok ? '✓' : '⚠',
        style: 'display:flex;align-items:flex-start;gap:10px;font-size:13px;color:' + (c.ok ? '#373A36' : '#0D3C7D'),
        glyphStyle: 'font-weight:700;flex-shrink:0;color:' + (c.ok ? '#2E7D5B' : '#0D3C7D')
      })),
      verified: (av.checklist || []).filter(c => c.ok).map((c, i) => ({ key: 'v' + i, label: c.label })),
      missing: this.apvMissing(av).map((m, i) => ({ key: 'm' + i, label: m })),
      hasMissing: this.apvMissing(av).length > 0,
      documents: (av.documents || []).map((dd, i) => ({
        key: i, name: dd.name, type: dd.type, ver: dd.ver,
        on: dd.on ? this.fmtDate(dd.on) : 'Not uploaded', by: dd.by || '—',
        status: dd.status.toUpperCase(), statusStyle: docChip(dd.status),
        rowStyle: 'display:flex;align-items:center;gap:16px;flex-wrap:wrap;border:1px solid ' + (dd.status === 'Missing' || dd.status === 'Expired' ? '#BFE0F5' : '#EDEDED') + ';border-radius:8px;padding:14px 16px;background:' + (dd.status === 'Missing' || dd.status === 'Expired' ? '#F4FAFE' : '#fff'),
        canView: dd.status !== 'Missing',
        viewStyle: 'border:1px solid #DFDFDF;background:#fff;border-radius:8px;padding:8px 14px;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;color:' + (dd.status === 'Missing' ? '#B7B9B6' : '#0073BF'),
        view: () => { if (dd.status === 'Missing') { this.toast('This document has not been uploaded yet'); return; } this.setState({ docView: Object.assign({}, dd) }); },
        download: () => this.toast('Downloading ' + dd.name + ' (' + dd.ver + ') — demo')
      })),
      plEnabled: av.plEnabled,
      plToggleStyle: toggleStyle(av.plEnabled, true),
      plChipText: av.plEnabled ? 'REQUESTED' : 'NOT REQUESTED',
      plChipStyle: av.plEnabled ? chip('#EAF6FD', '#0073BF') : chip('#E6E6E4', '#696B68'),
      feePackage: String(av.feePackage || '').trim() || 'Not assigned',
      feeStatus: avFeeStatus,
      feeStatusStyle: avFeeStatus === 'Complete' ? chip('#DCEEE4', '#2E7D5B') : avFeeStatus === 'Not requested' ? chip('#E6E6E4', '#696B68') : chip('#BFE0F5', '#0D3C7D'),
      serviceStatus: av.status === 'APPROVED' && av.plEnabled ? 'Active' : 'Inactive',
      serviceStyle: av.status === 'APPROVED' && av.plEnabled ? chip('#DCEEE4', '#2E7D5B') : chip('#E6E6E4', '#696B68'),
      channel: av.channel, validity: av.validity,
      audit: (av.audit || []).slice().reverse().map((ev, i) => ({ key: i, ts: this.fmtTs(ev.ts), actor: ev.actor || 'System', action: ev.action, status: ev.status }))
    };
    return {
      ...window.MMSFinance.bindings(this, nav),
      t: t,
      currentUserName: st.currentUser.name,
      currentUserInitials: st.currentUser.initials,
      currentUserId: st.currentUser.id,
      currentUserRole: t.roleAdmin,
      currentUserMeta: t.roleAdmin + ' · ' + st.currentUser.id,
      currentUserLabel: st.currentUser.name + ' — ' + t.roleAdmin + ' — ' + st.currentUser.id,
      navOpen: st.navOpen,
      openNav: () => this.setState({ navOpen: true }),
      closeNav: () => this.setState({ navOpen: false }),
      navItems: [
        { key: 'overview', label: 'Overview', page: 'overview' },
        { key: 'map', label: 'Merchant Map', page: 'map' },
        { key: 'businesses', label: 'Businesses', page: 'businesses' },
        { key: 'txns', label: 'Transactions', page: 'txns' },
        { key: 'payouts', label: 'Payouts', page: 'payouts' },
        { key: 'invoices', label: 'Invoices', page: 'invoices' },
        { key: 'downloads', label: 'Downloads', page: 'downloads' },
        { key: 'staff', label: 'Staff Management', page: 'staff' },
        { key: 'revenue', label: 'Revenue', page: 'revenue' },
        { key: 'isoLogs', label: 'ISO Logs', page: 'isoLogs' },
        { key: 'apps', label: 'Applications List', page: 'apps' },
        { key: 'approvals', label: 'Approvals List', page: 'approvals' }
      ].map(n => ({
        key: n.key, label: n.label,
        style: 'text-align:left;border:none;font-family:inherit;border-radius:8px;padding:14px 16px;font-size:15px;cursor:pointer;' + (st.page === n.page || (n.page === 'businesses' && st.page === 'detail') || (n.page === 'apps' && st.page === 'appDetail') || (n.page === 'approvals' && st.page === 'approvalDetail') ? 'background:#0073BF;color:#fff;font-weight:700' : 'background:transparent;color:rgba(255,255,255,.85);font-weight:500'),
        go: () => { this.setState({ navOpen: false, page: n.page, detailId: null, appId: null, apvId: null }); if (n.page === 'businesses') this.runLoad(); }
      })),
      isTxns: st.page === 'txns',
      goTxns: () => this.setState({ page: 'txns', navOpen: false, txnView: null }),
      navTxns: nav(st.page === 'txns'),
      txnScrollRef: this.setTxnScrollEl,
      onTxnScroll: this.syncTxnScroll,
      jumpTxnScroll: this.jumpTxnScroll,
      onThumbDown: this.onThumbDown,
      txnThumbRef: this.setTxnThumbEl,
      txnTrackRef: this.setTxnTrackEl,
      txnSrcAll: tabStyle(st.txnSrc === 'all'), txnSrcVp: tabStyle(st.txnSrc === 'VIETPAY'), txnSrcPv: tabStyle(st.txnSrc === 'PVCOM'),
      pickTxnAll: () => this.setState({ txnSrc: 'all', txnPage: 0 }),
      pickTxnVp: () => this.setState({ txnSrc: 'VIETPAY', txnPage: 0 }),
      pickTxnPv: () => this.setState({ txnSrc: 'PVCOM', txnPage: 0 }),
      tabAuthStyle: tabStyle(st.txnTab === 'authorized'), tabSetStyle: tabStyle(st.txnTab === 'settled'),
      tabRefStyle: tabStyle(st.txnTab === 'refund'), tabUnsStyle: tabStyle(st.txnTab === 'unsuccessful'),
      cntAuth: txnByTab('authorized').length, cntSet: txnByTab('settled').length,
      cntRef: txnByTab('refund').length, cntUns: txnByTab('unsuccessful').length,
      cntAuthStyle: countStyle(st.txnTab === 'authorized'), cntSetStyle: countStyle(st.txnTab === 'settled'),
      cntRefStyle: countStyle(st.txnTab === 'refund'), cntUnsStyle: countStyle(st.txnTab === 'unsuccessful'),
      pickAuth: () => this.setState({ txnTab: 'authorized', txnPage: 0 }),
      pickSet: () => this.setState({ txnTab: 'settled', txnPage: 0 }),
      pickRef: () => this.setState({ txnTab: 'refund', txnPage: 0 }),
      pickUns: () => this.setState({ txnTab: 'unsuccessful', txnPage: 0 }),
      txnStats, hasCtxCol: !!ctxLabel, ctxLabel,
      txnScrollHint: 'Drag scrollbar or swipe to see ' + (ctxLabel ? ctxLabel + ', ' : '') + 'Transaction ID, Order ID, MID, Card & Auth Code →',
      txnSubtitle: st.txnTab === 'settled' ? 'Settled transactions with confirmed settlement dates across VietPay and PVcomBank sources.'
        : st.txnTab === 'refund' ? 'Refunded transactions, including the date funds were returned to the cardholder.'
        : st.txnTab === 'unsuccessful' ? 'Declined and failed attempts with the reason returned by the issuer or gateway.'
        : 'Authorized card & QR transactions awaiting settlement across VietPay and PVcomBank sources.',
      txnSearch: st.txnSearch,
      onTxnSearch: (e) => { const val = e.target.value; this.setState({ txnSearch: val, txnPage: 0 }); },
      txnFiltersOpen: st.txnFiltersOpen,
      toggleTxnFilters: () => this.setState(s2 => ({ txnFiltersOpen: !s2.txnFiltersOpen, txnDeviceOpen: false, txnColsOpen: false, txnDraftF: Object.assign({}, s2.txnFilters) })),
      txnFilterBtnStyle: 'display:flex;align-items:center;gap:8px;border:1px solid ' + (txnChips.length ? '#0073BF' : '#DFDFDF') + ';background:' + (txnChips.length ? '#EAF6FD' : '#fff') + ';color:' + (txnChips.length ? '#0073BF' : '#1C1D1B') + ';border-radius:8px;padding:10px 16px;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer',
      txnFilterLabel: txnChips.length ? 'Filters · ' + txnChips.length : 'Filters',
      tdf: tdf,
      txnMerchantOptions: registeredMerchants.map(m => Object.assign({ key: m.mid }, m)),
      txnServiceOptions: registeredServices.map(key => ({ key })),
      txnDeviceOptions: deviceOptions.map(d => Object.assign({ key: d.id, pick: () => this.setState(s2 => ({ txnDeviceOpen: false, txnDeviceSearch: '', txnDraftF: Object.assign({}, s2.txnDraftF, { deviceId: d.id }) })) }, d)),
      txnNoServices: !registeredServices.length,
      txnNoDevices: !registeredDevices.length,
      txnServiceHint: !registeredServices.length ? 'This merchant has no registered services.' : 'Services registered by the selected merchant(s).',
      txnDeviceHint: tdf.service === 'Payment Link' ? 'Payment Link does not use a physical device.' : !registeredServices.length ? 'Register a service before assigning a device.' : !registeredDevices.length ? 'No devices assigned to the selected service(s).' : !deviceOptions.length ? 'No devices match your search.' : registeredDevices.length + ' registered device(s).',
      txnIsQr: tdf.paymentType === 'QR',
      txnCardPlaceholder: tdf.paymentType === 'QR' ? 'Not applicable to QR' : 'All card networks',
      txnRegistrationHint: !registeredServices.length ? 'This merchant has no registered services.' : tdf.service === 'Payment Link' ? 'Payment Link does not use a physical device.' : !registeredDevices.length ? 'No devices assigned to the selected service(s).' : 'Device choices reflect the selected merchant and registered service.',
      txnDeviceOpen: !!st.txnDeviceOpen && !!registeredDevices.length,
      txnDeviceValue: tdf.deviceId || (!registeredDevices.length ? 'No device available' : 'All matching devices'),
      toggleTxnDevice: () => { this.setState({ txnDeviceOpen: !st.txnDeviceOpen, txnDeviceSearch: '' }); if (!st.txnDeviceOpen) setTimeout(() => { const el = document.getElementById('txn-device-query'); if (el) el.focus(); }, 0); },
      txnDeviceKeyDown: (e) => { if (e.key === 'Escape') { this.setState({ txnDeviceOpen: false }); const el = document.getElementById('txn-device-value'); if (el) el.closest('button').focus(); } },
      clearTxnDevice: () => this.setState(s2 => ({ txnDeviceOpen: false, txnDeviceSearch: '', txnDraftF: Object.assign({}, s2.txnDraftF, { deviceId: '' }) })),
      txnDeviceSearch: st.txnDeviceSearch || '', 
      setTxnDeviceSearch: (e) => this.setState({ txnDeviceSearch: e.target.value }),
      setTxnMerchant: setTxnScope('merchant'),
      setTxnFrom: setTd('from'), setTxnTo: setTd('to'), setTxnMethod: (e) => { const value = e.target.value; this.setState(s2 => ({ txnDraftF: Object.assign({}, s2.txnDraftF, { method: value }, value !== 'All' ? { paymentType: 'Card' } : {}) })); },
      setTxnSource: setTxnScope('source'), setTxnMin: setTd('min'), setTxnMax: setTd('max'),
      setTxnPaymentType: (e) => { const value = e.target.value; this.setState(s2 => ({ txnDraftF: Object.assign({}, s2.txnDraftF, { paymentType: value, method: 'All' }) })); }, setTxnService: setTxnScope('service'), setTxnDeviceId: setTd('deviceId'),
      applyTxnFilters: () => this.setState(s2 => ({ txnFilters: Object.assign({}, s2.txnDraftF), txnDeviceOpen: false, txnFiltersOpen: false, txnPage: 0 })),
      clearTxnFilters: () => this.setState({ txnDeviceOpen: false, txnDeviceSearch: '', txnFilters: this.blankTxn(), txnDraftF: this.blankTxn(), txnPage: 0 }),
      txnChips: txnChips, hasTxnChips: txnChips.length > 0,
      txnColsOpen: st.txnColsOpen,
      toggleTxnCols: () => this.setState(s2 => ({ txnColsOpen: !s2.txnColsOpen, txnFiltersOpen: false })),
      txnColOptions: [['txn', 'Transaction ID'], ['order', 'Order ID'], ['mid', 'MID'], ['card', 'Card'], ['auth', 'Auth Code'], ['terminal', 'Terminal'], ['channel', 'Channel']].map(c => ({
        key: c[0], label: c[1], glyph: st.txnCols[c[0]] ? '✓' : '',
        style: 'display:flex;align-items:center;justify-content:space-between;gap:12px;border:none;background:transparent;font-family:inherit;width:100%;text-align:left;border-radius:6px;padding:9px 10px;font-size:13px;font-weight:600;cursor:pointer;color:' + (st.txnCols[c[0]] ? '#0073BF' : '#373A36'),
        toggle: () => this.setState(s2 => ({ txnCols: Object.assign({}, s2.txnCols, { [c[0]]: !s2.txnCols[c[0]] }) }))
      })),
      cTxn: st.txnCols.txn, cOrder: st.txnCols.order, cMid: st.txnCols.mid,
      cCard: st.txnCols.card, cAuth: st.txnCols.auth, cTerminal: st.txnCols.terminal, cChannel: st.txnCols.channel,
      exportTxn: exportTxn,
      txnHead: txnHead,
      txnRows: txnRows,
      txnShowTable: !isMobile && txnTotal > 0,
      txnShowCards: isMobile && txnTotal > 0,
      txnEmpty: txnTotal === 0,
      txnRangeText: txnTotal === 0 ? 'No results' : (txnPageIdx * st.txnPer + 1) + '–' + Math.min(txnTotal, txnPageIdx * st.txnPer + st.txnPer) + ' of ' + txnTotal + ' transactions',
      txnPageText: 'Page ' + (txnPageIdx + 1) + ' of ' + txnPages,
      txnPer: String(st.txnPer),
      txnPerOpts: [8, 25, 50].map(n => ({ key: n, v: String(n) })),
      setTxnPer: (e) => { const val = parseInt(e.target.value, 10); this.setState({ txnPer: val, txnPage: 0 }); },
      txnPrev: () => this.setState(s2 => ({ txnPage: Math.max(0, s2.txnPage - 1) })),
      txnNext: () => this.setState(s2 => ({ txnPage: Math.min(txnPages - 1, s2.txnPage + 1) })),
      txnPrevStyle: pgBtn(txnPageIdx > 0), txnNextStyle: pgBtn(txnPageIdx < txnPages - 1),
      txnDrawerOpen: !!tv,
      txnCanVoid: !!tv && tv.status === 'AUTHORIZED',
      txnCanRefund: !!tv && tv.status === 'SETTLED',
      voidTxn: () => tv && this.updateTxnLifecycle(tv.id, 'void'),
      refundTxn: () => tv && this.updateTxnLifecycle(tv.id, 'refund'),
      txnLifecycleAudit: tv && tv.lifecycleAudit ? tv.lifecycleAudit : [],
      closeTxn: () => this.setState({ txnView: null }),
      tv: tv ? {
        id: tv.id, merchant: tv.merchant, amount: this.fmtVnd(tv.amount),
        status: tv.status, statusStyle: txStatusChip(tv.status),
        source: tv.source === 'VIETPAY' ? 'VietPay' : 'PVCB', sourceStyle: srcChip(tv.source),
        hasReason: !!tv.reason, reason: tv.reason,
        fields: [
          { key: 'order', label: 'Order ID', value: tv.order },
          { key: 'mid', label: 'MID', value: tv.mid },
          { key: 'method', label: 'Payment method', value: METH[tv.method].name },
          { key: 'card', label: 'Card', value: tv.card ? '•••• ' + tv.card : '—' },
          { key: 'auth', label: 'Auth code', value: tv.auth },
          { key: 'when', label: 'Date & time', value: this.fmtDate(tv.date) + ' · ' + tv.time },
          { key: 'term', label: 'Terminal', value: tv.terminal },
          { key: 'chan', label: 'Channel', value: tv.channel },
          { key: 'settled', label: 'Settlement date', value: tv.settled ? this.fmtDate(tv.settled) : 'Not settled' }
        ]
      } : null,
      isApprovals: st.page === 'approvals',
      isApvDetail: st.page === 'approvalDetail' && !!av,
      goApprovals: () => this.setState({ page: 'approvals', apvId: null, docView: null }),
      navApprovals: nav(st.page === 'approvals' || st.page === 'approvalDetail'),
      tabApvColor: (st.page === 'approvals' || st.page === 'approvalDetail') ? '#0073BF' : '#696B68',
      apvSearch: st.apvSearch,
      onApvSearch: (e) => { const val = e.target.value; this.setState({ apvSearch: val, apvPage: 0 }); },
      srcAllStyle: tabStyle(st.apvSrc === 'all'), srcVpStyle: tabStyle(st.apvSrc === 'VIETPAY'), srcPvStyle: tabStyle(st.apvSrc === 'PVCOM'),
      pickSrcAll: () => this.setState({ apvSrc: 'all', apvPage: 0 }),
      pickSrcVp: () => this.setState({ apvSrc: 'VIETPAY', apvPage: 0 }),
      pickSrcPv: () => this.setState({ apvSrc: 'PVCOM', apvPage: 0 }),
      apvTabAllStyle: tabStyle(st.apvTab === 'all'), apvTabPendStyle: tabStyle(st.apvTab === 'pending'),
      apvTabRejStyle: tabStyle(st.apvTab === 'rejected'), apvTabAppStyle: tabStyle(st.apvTab === 'approved'),
      apvCntAllStyle: countStyle(st.apvTab === 'all'), apvCntPendStyle: countStyle(st.apvTab === 'pending'),
      apvCntRejStyle: countStyle(st.apvTab === 'rejected'), apvCntAppStyle: countStyle(st.apvTab === 'approved'),
      apvCntAll: apvBase.length, apvCntPend: apvByTab('pending').length,
      apvCntRej: apvByTab('rejected').length, apvCntApp: apvByTab('approved').length,
      pickApvAll: () => this.setState({ apvTab: 'all', apvPage: 0 }),
      pickApvPend: () => this.setState({ apvTab: 'pending', apvPage: 0 }),
      pickApvRej: () => this.setState({ apvTab: 'rejected', apvPage: 0 }),
      pickApvApp: () => this.setState({ apvTab: 'approved', apvPage: 0 }),
      apvFiltersOpen: st.apvFiltersOpen,
      toggleApvFilters: () => this.setState(s2 => ({ apvFiltersOpen: !s2.apvFiltersOpen, apvDraftF: Object.assign({}, s2.apvFilters) })),
      apvFilterBtnStyle: 'display:flex;align-items:center;gap:8px;border:1px solid ' + (apvChips.length ? '#0073BF' : '#DFDFDF') + ';background:' + (apvChips.length ? '#EAF6FD' : '#fff') + ';color:' + (apvChips.length ? '#0073BF' : '#373A36') + ';border-radius:8px;padding:10px 16px;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer',
      apvFilterCount: apvChips.length ? 'Filters · ' + apvChips.length : 'Filters',
      apvD: apvD,
      setApvFrom: setApvD('from'), setApvTo: setApvD('to'), setApvCustomer: setApvD('customerType'),
      setApvSource: setApvD('source'), setApvEkyc: setApvD('ekyc'), setApvKyb: setApvD('kyb'),
      setApvStatus: setApvD('status'), setApvMaker: setApvD('maker'), setApvChecker: setApvD('checker'),
      makerOpts: makerOpts.map(m => ({ key: m, v: m })),
      checkerOpts: checkerOpts.map(m => ({ key: m, v: m })),
      applyApvFilters: () => this.setState(s2 => ({ apvFilters: Object.assign({}, s2.apvDraftF), apvFiltersOpen: false, apvPage: 0 })),
      clearApvFilters: () => this.setState({ apvFilters: this.blankApv(), apvDraftF: this.blankApv(), apvPage: 0 }),
      apvChips: apvChips,
      hasApvChips: apvChips.length > 0,
      apvColsOpen: st.apvColsOpen,
      toggleApvCols: () => this.setState(s2 => ({ apvColsOpen: !s2.apvColsOpen })),
      apvColOptions: [['customer', 'Customer type'], ['ekyc', 'eKYC status'], ['kyb', 'KYB status'], ['maker', 'Maker'], ['checker', 'Checker'], ['submitted', 'Submitted on'], ['updated', 'Updated on'], ['reason', 'Reason']].map(c => ({
        key: c[0], label: c[1], on: !!cw[c[0]],
        glyph: cw[c[0]] ? '✓' : '',
        style: 'display:flex;align-items:center;justify-content:space-between;gap:12px;border:none;background:transparent;font-family:inherit;width:100%;text-align:left;border-radius:6px;padding:9px 10px;font-size:13px;font-weight:600;cursor:pointer;color:' + (cw[c[0]] ? '#0073BF' : '#373A36'),
        toggle: () => this.setState(s2 => ({ apvCols: Object.assign({}, s2.apvCols, { [c[0]]: !s2.apvCols[c[0]] }) }))
      })),
      exportApv: exportCsv,
      colCustomer: colCustomer, colEkyc: colEkyc, colKyb: colKyb, colMaker: colMaker,
      colChecker: colChecker, colSubmitted: colSubmitted, colUpdated: colUpdated, colReason: colReason,
      colExpand: colExpand,
      headStyle: stickyHead,
      headName: sortHead('name') + ';left:0;z-index:3',
      headSubmitted: sortHead('submitted'), headUpdated: sortHead('updated'), headStatus: sortHead('status'),
      sortName: pickSort('name'), sortSubmitted: pickSort('submitted'), sortUpdated: pickSort('updated'), sortStatus: pickSort('status'),
      glyphName: apvSortGlyph('name'), glyphSubmitted: apvSortGlyph('submitted'), glyphUpdated: apvSortGlyph('updated'), glyphStatus: apvSortGlyph('status'),
      cellStyle: cellPad,
      apvTableMinW: isTablet ? '820px' : '1320px',
      apvTableMaxH: isTablet ? '520px' : '580px',
      apvRows: apvRows,
      apvShowTable: !isMobile && apvTotal > 0,
      apvShowCards: isMobile && apvTotal > 0,
      apvEmpty: apvTotal === 0,
      apvRangeText: apvTotal === 0 ? 'No results' : (apvPageIdx * st.apvPer + 1) + '–' + Math.min(apvTotal, apvPageIdx * st.apvPer + st.apvPer) + ' of ' + apvTotal + ' requests',
      apvPer: String(st.apvPer),
      apvPerOpts: apvPerOpts,
      setApvPer: (e) => { const val = parseInt(e.target.value, 10); this.setState({ apvPer: val, apvPage: 0 }); },
      apvPrev: () => this.setState(s2 => ({ apvPage: Math.max(0, s2.apvPage - 1) })),
      apvNext: () => this.setState(s2 => ({ apvPage: Math.min(apvPages - 1, s2.apvPage + 1) })),
      apvPrevStyle: pgBtn(apvPageIdx > 0), apvNextStyle: pgBtn(apvPageIdx < apvPages - 1),
      apvPageText: 'Page ' + (apvPageIdx + 1) + ' of ' + apvPages,
      v: v,
      avAlert: !!av && !!av.docsUpdated,
      avAlertText: av ? 'Documents were updated after submission — re-review the new version before deciding.' : '',
      avApproveDisabled: avBlocked || !avOpen,
      avApproveTitle: !avOpen ? 'This request has already been decided' : avBlocked ? 'Complete before approving: ' + avMiss.join(' · ') : 'Approve this application',
      avApproveStyle: 'display:flex;align-items:center;gap:8px;border:none;font-family:inherit;background:#0073BF;color:#fff;border-radius:8px;padding:12px 24px;font-size:14px;font-weight:700;' + (avBlocked || !avOpen ? 'opacity:.45;cursor:not-allowed' : 'cursor:pointer'),
      avDecideOpen: avOpen,
      avBlocked: avBlocked,
      avBlockReason: avMiss.length ? 'Approve is blocked — missing: ' + avMiss.join(' · ') : '',
      avDecidedNote: !av || avOpen ? '' : (av.status === 'APPROVED' ? 'Approved · merchant created in Businesses' : 'Rejected · returned to the maker'),
      askApvApprove: () => { if (avBlocked || !avOpen) return; this.setState({ modal: { type: 'apvApprove', id: st.apvId }, reason: '', reasonError: false }); },
      askApvReject: () => this.setState({ modal: { type: 'apvReject', id: st.apvId }, reason: '', reasonError: false }),
      openRc: () => this.setState({ rcOpen: true, rcSel: {}, rcNote: '', rcError: false }),
      closeRc: () => this.setState({ rcOpen: false, rcError: false }),
      rcOpen: st.rcOpen,
      rcItems: rcItems,
      rcNoItems: rcItems.length === 0,
      rcNote: st.rcNote,
      onRcNote: (e) => { const val = e.target.value; this.setState({ rcNote: val, rcError: false }); },
      rcError: st.rcError,
      rcNoteBorder: st.rcError ? '#0D3C7D' : '#DFDFDF',
      sendChanges: sendChanges,
      openFullApp: () => { if (av) this.openApp(av.id); },
      docOpen: !!dv,
      docDrawerW: isMobile ? '100%' : '460px',
      closeDoc: () => this.setState({ docView: null }),
      dv: dv ? {
        name: dv.name, type: dv.type, ver: dv.ver,
        on: dv.on ? this.fmtDate(dv.on) : 'Not uploaded', by: dv.by || '—',
        status: dv.status.toUpperCase(), stampStyle: docChip(dv.status) + ';position:absolute;top:16px;right:16px',
        meta: [
          { key: 'type', label: 'Document type', value: dv.type },
          { key: 'ver', label: 'Version', value: dv.ver },
          { key: 'on', label: 'Uploaded on', value: dv.on ? this.fmtDate(dv.on) : 'Not uploaded' },
          { key: 'by', label: 'Uploaded by', value: dv.by || '—' },
          { key: 'st', label: 'Verification status', value: dv.status }
        ]
      } : null,
      downloadDoc: () => { if (dv) this.toast('Downloading ' + dv.name + ' (' + dv.ver + ') — demo'); },
      isPayouts: st.page === 'payouts',
      goPayouts: () => this.setState({ page: 'payouts', navOpen: false, poView: null }),
      navPayouts: nav(st.page === 'payouts'),
      poSrcAll: tabStyle(st.poSrc === 'all'), poSrcVp: tabStyle(st.poSrc === 'VIETPAY'), poSrcPv: tabStyle(st.poSrc === 'PVCOM'),
      poCntAll: String(st.payouts.length), poCntVp: String(st.payouts.filter(p => p.entity === 'VIETPAY').length), poCntPv: String(st.payouts.filter(p => p.entity === 'PVCOM').length),
      poCntAllStyle: countStyle(st.poSrc === 'all'), poCntVpStyle: countStyle(st.poSrc === 'VIETPAY'), poCntPvStyle: countStyle(st.poSrc === 'PVCOM'),
      pickPoAll: () => this.setState({ poSrc: 'all', poPage: 0 }),
      pickPoVp: () => this.setState({ poSrc: 'VIETPAY', poPage: 0 }),
      pickPoPv: () => this.setState({ poSrc: 'PVCOM', poPage: 0 }),
      poCards: poCards,
      poSearch: st.poSearch,
      onPoSearch: (e) => { const v = e.target.value; this.setState({ poSearch: v, poPage: 0 }); },
      poHasSearch: st.poSearch.length > 0,
      clearPoSearch: () => this.setState({ poSearch: '', poPage: 0 }),
      poFiltersOpen: st.poFiltersOpen,
      togglePoFilters: () => this.setState(s2 => ({ poFiltersOpen: !s2.poFiltersOpen, poColsOpen: false, poExportOpen: false, poDraftPo: Object.assign({}, s2.poFilters) })),
      poFilterBtnStyle: 'display:flex;align-items:center;gap:8px;border:1px solid ' + (poChips.length ? '#0073BF' : '#DFDFDF') + ';background:' + (poChips.length ? '#EAF6FD' : '#fff') + ';color:' + (poChips.length ? '#0073BF' : '#1C1D1B') + ';border-radius:8px;padding:10px 16px;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer',
      poFilterLabel: poChips.length ? 'Filters (' + poChips.length + ')' : 'Filters',
      pd: pd,
      setPoPFrom: setPd('pFrom'), setPoPTo: setPd('pTo'), setPoSFrom: setPd('sFrom'), setPoSTo: setPd('sTo'),
      setPoMerchant: setPd('merchant'), setPoEntity: setPd('entity'), setPoStatus: setPd('status'),
      setPoMin: setPd('min'), setPoMax: setPd('max'), setPoBank: setPd('bank'), setPoChannel: setPd('channel'),
      setPoSortBy: setPd('sortBy'), setPoDir: setPd('dir'),
      applyPoFilters: () => { this.setState(s2 => ({ poFilters: Object.assign({}, s2.poDraftPo), poFiltersOpen: false, poPage: 0 })); this.toast('Filters applied'); },
      clearPoFilters: () => this.setState({ poFilters: this.blankPo(), poDraftPo: this.blankPo(), poPage: 0 }),
      poChips: poChips, poHasChips: poChips.length > 0,
      poColsOpen: st.poColsOpen,
      togglePoCols: () => this.setState(s2 => ({ poColsOpen: !s2.poColsOpen, poFiltersOpen: false, poExportOpen: false })),
      poColItems: poColItems,
      resetPoCols: () => { this.setState({ poCols: { entity: true, period: true, sdate: false, count: false, gross: true, fees: true, other: false, bank: true, account: false, holder: false, bankref: true } }); this.toast('Columns reset to default'); },
      poExportOpen: st.poExportOpen,
      togglePoExport: () => this.setState(s2 => ({ poExportOpen: !s2.poExportOpen, poColsOpen: false, poFiltersOpen: false })),
      exportPoCsv: poExport('csv'), exportPoXlsx: poExport('xlsx'), exportPoPdf: poExport('pdf'),
      poExportScope: poSelIds.length ? poSelIds.length + ' selected payouts' : poTotal + ' filtered payouts',
      poSelCount: poSelIds.length, poHasSel: poSelIds.length > 0,
      poSelText: poSelIds.length + (poSelIds.length === 1 ? ' payout selected' : ' payouts selected'),
      clearPoSel: () => this.setState({ poSel: {} }),
      poAllSel: poSlice.length > 0 && poSlice.every(p => st.poSel[p.id]),
      togglePoAll: () => this.setState(s2 => {
        const on = poSlice.length > 0 && poSlice.every(p => s2.poSel[p.id]);
        const next = Object.assign({}, s2.poSel);
        poSlice.forEach(p => { next[p.id] = !on; });
        return { poSel: next };
      }),
      poRows: poRows,
      poCol: pc, poHead: poHead, poCell: poCell,
      poTableMin: isTablet ? '740px' : '1700px',
      poShowHint: !isTablet,
      poW: poW,
      poHeadMerchant: poSortHead('merchant', 'Merchant'), poHeadNet: poSortHead('net', 'Net Payout'),
      poHeadDate: poSortHead('pdate', 'Payout Date'), poHeadStatus: poSortHead('status', 'Status'),
      poShowTable: !isMobile && st.poState === 'ready' && poTotal > 0,
      poShowCards: isMobile && st.poState === 'ready' && poTotal > 0,
      poLoading: st.poState === 'loading', poError: st.poState === 'error',
      poEmptyAll: st.poState === 'empty',
      poNoResults: st.poState === 'ready' && poTotal === 0,
      poSkeletonRows: [1, 2, 3, 4, 5, 6].map(n => ({ key: 'sk' + n })),
      poRetry: () => { this.setState({ poState: 'loading' }); setTimeout(() => this.setState({ poState: 'ready' }), 900); },
      poStateOpts: [
        { key: 'ready', label: 'Populated', v: 'ready' }, { key: 'loading', label: 'Loading', v: 'loading' },
        { key: 'empty', label: 'Empty', v: 'empty' }, { key: 'error', label: 'Error', v: 'error' }
      ].map(o => ({
        key: o.key, label: o.label,
        style: 'border:1px solid ' + (st.poState === o.v ? '#0073BF' : '#DFDFDF') + ';background:' + (st.poState === o.v ? '#EAF6FD' : '#fff') + ';color:' + (st.poState === o.v ? '#0073BF' : '#696B68') + ';border-radius:999px;padding:4px 12px;font-family:inherit;font-size:11px;font-weight:600;cursor:pointer',
        pick: () => this.setState({ poState: o.v })
      })),
      poRefresh: () => { this.setState({ poState: 'loading', poSel: {} }); setTimeout(() => this.setState({ poState: 'ready' }), 800); },
      poRangeText: poTotal === 0 ? 'No results' : (poPageIdx * st.poPer + 1) + '\u2013' + Math.min(poTotal, poPageIdx * st.poPer + st.poPer) + ' of ' + poTotal + ' payouts',
      poPageText: 'Page ' + (poPageIdx + 1) + ' of ' + poPages,
      poPer: String(st.poPer),
      poPerOpts: [10, 25, 50, 100].map(n => ({ key: n, v: String(n) })),
      setPoPer: (e) => { const v = parseInt(e.target.value, 10); this.setState({ poPer: v, poPage: 0 }); },
      poPrev: () => this.setState(s2 => ({ poPage: Math.max(0, s2.poPage - 1) })),
      poNext: () => this.setState(s2 => ({ poPage: Math.min(poPages - 1, s2.poPage + 1) })),
      poPrevStyle: pgBtn(poPageIdx > 0), poNextStyle: pgBtn(poPageIdx < poPages - 1),
      poDrawerOpen: !!pv,
      closePo: () => this.setState({ poView: null }),
      pvData: pv ? {
        id: pv.id, status: pv.status, statusStyle: poStatusChip(pv.status),
        entity: pv.entity === 'VIETPAY' ? 'VietPay' : 'PVcomBank', entityStyle: srcChip(pv.entity),
        merchant: pv.merchant, net: this.fmtDong(pv.net), paidOn: this.fmtDate(pv.pdate) + ', ' + pv.ptime,
        isFailed: pv.status === 'FAILED', failReason: pv.failReason,
        merchantFields: [
          { key: 'm2', label: 'MID', value: pv.mid }, { key: 'm3', label: 'Entity', value: pv.entity === 'VIETPAY' ? 'VietPay' : 'PVcomBank' },
          { key: 'm4', label: 'Merchant bank account', value: pv.account }, { key: 'm5', label: 'Account holder', value: pv.holder },
          { key: 'm6', label: 'Destination bank', value: pv.bank }
        ],
        settleFields: [
          { key: 's1', label: 'Settlement period', value: pv.period }, { key: 's2', label: 'Settlement date', value: this.fmtDate(pv.sdate) },
          { key: 's3', label: 'Transaction count', value: String(pv.count) }, { key: 's4', label: 'Payment channels', value: pv.channels }
        ],
        settlementId: pv.settlementId,
        calcRows: [
          { key: 'a1', op: '', label: 'Gross transaction amount', value: this.fmtDong(pv.gross), strong: false },
          { key: 'a2', op: '\u2212', label: 'Transaction fees', value: this.fmtDong(pv.fees), strong: false },
          { key: 'a3', op: '\u2212', label: 'Refund adjustments', value: pv.refundAdj ? this.fmtDong(pv.refundAdj) : this.fmtDong(0), strong: false },
          { key: 'a4', op: '\u00b1', label: 'Other adjustments', value: pv.otherAdj ? this.fmtDong(pv.otherAdj) : this.fmtDong(0), strong: false }
        ],
        procFields: [
          { key: 'p1', label: 'Payout status', value: pv.status }, { key: 'p2', label: 'Payout date', value: this.fmtDate(pv.pdate) + ', ' + pv.ptime },
          { key: 'p3', label: 'Bank reference', value: pv.bankRef }, { key: 'p4', label: 'Created', value: pv.created }, { key: 'p5', label: 'Last updated', value: pv.updated }
        ],
        timeline: [
          { key: 't1', label: 'Payout created', ts: pv.created, done: true },
          { key: 't2', label: 'Sent for bank processing', ts: pv.created.replace('06:05', '06:12'), done: true },
          { key: 't3', label: 'Bank acknowledged', ts: pv.status === 'PENDING' ? 'Waiting' : pv.updated, done: pv.status !== 'PENDING' },
          { key: 't4', label: pv.status === 'FAILED' ? 'Payout failed' : 'Payout completed', ts: pv.status === 'COMPLETED' || pv.status === 'FAILED' ? pv.updated : 'Waiting', done: pv.status === 'COMPLETED' || pv.status === 'FAILED' }
        ].map(x => Object.assign(x, {
          dotStyle: 'height:10px;width:10px;flex-shrink:0;border-radius:999px;margin-top:5px;background:' + (x.done ? '#0073BF' : '#DFDFDF'),
          labelStyle: 'font-size:13px;font-weight:600;color:' + (x.done ? '#1C1D1B' : '#696B68')
        })),
        openMerchant: () => { const m = st.merchants.find(x => x.name === pv.merchant); this.setState({ poView: null, page: m ? 'detail' : 'businesses', detailId: m ? m.id : null }); if (!m) this.toast('Merchant record is not in this demo dataset'); },
        openSettlement: () => { this.setState({ poView: null, page: 'txns', txnTab: 'settled', txnSearch: pv.mid, txnPage: 0 }); this.toast('Transactions filtered by ' + pv.settlementId); },
        retry: () => this.toast('Re-run requires Finance authorisation \u2014 no financial action is taken in this demo')
      } : null,
      isMap: st.page === 'map',
      goMap: () => this.setState({ page: 'map', detailId: null }),
      navMap: nav(st.page === 'map'),
      tabMapColor: st.page === 'map' ? '#0073BF' : '#696B68',
      isNetwork: st.page === 'network',
      goNetwork: () => this.setState({ page: 'network', navOpen: false, networkSelected: 'partner-vp' }),
      navNetwork: nav(st.page === 'network'),
      networkRows: networkTreeRows,
      networkChildRows,
      networkSelectedName: networkSelected.name,
      networkSelectedCode: networkSelected.code,
      networkSelectedKind: networkSelected.kind,
      networkSelectedMerchants: String(networkSelected.merchants),
      networkSelectedCommission: this.fmtVnd(networkSelected.commission),
      networkSelectedStatus: networkSelected.status,
      networkSelectedStatusStyle: networkSelected.status === 'ACTIVE' ? chip('#DCEEE4', '#2E7D5B') : chip('#FBEED1', '#B27C12'),
      networkHasChildren: networkChildRows.length > 0,
      goCommission: () => this.setState({ page: 'commissionDetail' }),
      isCommission: st.page === 'commission',
      isCommissionDetail: st.page === 'commissionDetail',
      goCommissions: () => this.setState({ page: 'commission', navOpen: false, commissionPartner: 'all' }),
      navCommissions: nav(st.page === 'commission' || st.page === 'commissionDetail'),
      commissionView: st.commissionView, isCommissionGraph: st.commissionView === 'graph', isCommissionTable: st.commissionView === 'table',
      commissionGraphStyle: st.commissionView === 'graph' ? 'border:none;background:#fff;color:#0073BF;border-radius:6px;padding:9px 14px;font-weight:700;cursor:pointer' : 'border:none;background:transparent;color:#696B68;border-radius:6px;padding:9px 14px;font-weight:600;cursor:pointer',
      commissionTableStyle: st.commissionView === 'table' ? 'border:none;background:#fff;color:#0073BF;border-radius:6px;padding:9px 14px;font-weight:700;cursor:pointer' : 'border:none;background:transparent;color:#696B68;border-radius:6px;padding:9px 14px;font-weight:600;cursor:pointer',
      pickCommissionGraph: () => this.setState({ commissionView: 'graph' }), pickCommissionTable: () => this.setState({ commissionView: 'table' }),
      commissionRows: commissionTableRows, commissionSelectedName: selectedCommission.partner, commissionSelectedMid: selectedCommission.mid,
      commissionSelectedLifetime: this.fmtVnd(selectedCommission.lifetime), commissionSelectedBalance: this.fmtVnd(selectedCommission.balance), commissionSelectedMerchants: String(selectedCommission.merchants), commissionSelectedStatus: selectedCommission.status,
      commissionTotalTxn: this.fmtVnd(commissionTotalTxn), commissionTotalRental: this.fmtVnd(commissionTotalRental), commissionExport, commissionRange: st.commissionRange, commissionRangeLabel: st.commissionRange === '90d' ? 'last 90 days' : 'last 30 days',
      setCommissionRange: (e) => this.setState({ commissionRange: e.target.value }),
      commissionDetailBack: () => this.setState({ page: 'commission' }),
      commissionDetailRows: selectedCommission ? [
        { label: 'Partner', value: selectedCommission.partner }, { label: 'MID / BC', value: selectedCommission.mid },
        { label: 'Lifetime points', value: this.fmtVnd(selectedCommission.lifetime) }, { label: 'Balance points', value: this.fmtVnd(selectedCommission.balance) },
        { label: 'Monthly average', value: this.fmtVnd(Math.round(selectedCommission.transactionFee / 6)) }, { label: 'Referred merchants', value: String(selectedCommission.merchants) },
        { label: 'Transaction fees', value: this.fmtVnd(selectedCommission.transactionFee) }, { label: 'POS rental fees', value: this.fmtVnd(selectedCommission.rentalFee) }
      ] : [],
      isStaff: st.page === 'staff',
      goStaff: () => this.setState({ page: 'staff', navOpen: false }),
      navStaff: nav(st.page === 'staff'),
      isRevenue: st.page === 'revenue', goRevenue: () => this.setState({ page:'revenue', navOpen:false }), navRevenue: nav(st.page === 'revenue'),
      isIsoLogs: st.page === 'isoLogs', goIsoLogs: () => this.setState({ page:'isoLogs', navOpen:false }), navIsoLogs: nav(st.page === 'isoLogs'),
      revenueEntity: st.revenueEntity, revenueStatus: st.revenueStatus, revenueFrom: st.revenueFrom, revenueTo: st.revenueTo,
      setRevenueEntity: e => this.setState({ revenueEntity:e.target.value }), setRevenueStatus: e => this.setState({ revenueStatus:e.target.value }), setRevenueFrom: e => this.setState({ revenueFrom:e.target.value }), setRevenueTo: e => this.setState({ revenueTo:e.target.value }),
      revenueRows: this.seedCommission().map((x,i)=>({ merchant:x.partner, entity:i===1?'PVCB':'VIETPAY', transaction:this.fmtVnd(x.transactionFee), monthly:this.fmtVnd(x.rentalFee), setup:this.fmtVnd(i*250000), transfer:this.fmtVnd(i*120000), vat:this.fmtVnd(Math.round((x.transactionFee+x.rentalFee)*.1)), total:this.fmtVnd(x.transactionFee+x.rentalFee+i*370000), status:i===2?'Pending':'Posted' })).filter(x=>(st.revenueEntity==='ALL'||x.entity===st.revenueEntity)&&(st.revenueStatus==='All'||x.status===st.revenueStatus)),
      isoSearch: st.isoSearch, isoStatus: st.isoStatus, setIsoSearch:e=>this.setState({isoSearch:e.target.value}), setIsoStatus:e=>this.setState({isoStatus:e.target.value}),
      isoRows: [{time:'12 Sep 2026 20:14:22.031',type:'0200 Authorization',id:'TXN-8823410',mid:'MID-100234',status:'Approved',source:'POS',code:'00'},{time:'12 Sep 2026 20:13:58.442',type:'0400 Reversal',id:'TXN-8823409',mid:'MID-100567',status:'Rejected',source:'QR',code:'05'},{time:'12 Sep 2026 20:12:40.119',type:'0200 Authorization',id:'TXN-8823408',mid:'MID-100812',status:'Approved',source:'Payment Link',code:'00'},{time:'12 Sep 2026 20:11:04.771',type:'0500 Settlement',id:'STL-20260912-001',mid:'—',status:'Pending',source:'Batch',code:'—'}].filter(x=>(!st.isoSearch||(x.type+' '+x.id+' '+x.mid+' '+x.source).toLowerCase().includes(st.isoSearch.toLowerCase()))&&(st.isoStatus==='All'||x.status===st.isoStatus)),
      staffRows: [{ id: 'stf-001', name: 'Linh Tran', email: 'linh.tran@vietpay.com', role: 'Maker', status: 'Active' }, { id: 'stf-002', name: 'Minh Pham', email: 'minh.pham@pvcb.com', role: 'Checker', status: 'Active' }, { id: 'stf-003', name: 'An Nguyen', email: 'an.nguyen@vietpay.com', role: 'Admin', status: 'Active' }].map(x => ({ ...x, selected: x.id === st.staffSelected, open: () => this.setState({ staffSelected: x.id }) })),
      staffSelected: st.staffSelected,
      staffSelectedName: ({ 'stf-001': 'Linh Tran', 'stf-002': 'Minh Pham', 'stf-003': 'An Nguyen' })[st.staffSelected],
      staffPermissionRows: ['transactions','payouts','invoices','downloads','approvals','commission'].map(k => ({ key:k, label:k[0].toUpperCase()+k.slice(1), checked: !!(st.staffPermissions[st.staffSelected] || {})[k], toggle: () => this.setState(s2 => ({ staffPermissions: { ...s2.staffPermissions, [s2.staffSelected]: { ...s2.staffPermissions[s2.staffSelected], [k]: !s2.staffPermissions[s2.staffSelected][k] } }, staffAudit: [{ ts: '12 Sep 2026, 20:00', editor: s2.currentUser.name, user: ({ 'stf-001':'Linh Tran','stf-002':'Minh Pham','stf-003':'An Nguyen' })[s2.staffSelected], change: 'Updated '+k+' permission', }, ...s2.staffAudit] })) })),
      staffAuditRows: st.staffAudit.slice(0, 8),
      isLoading: st.loadState === 'loading',
      isError: st.loadState === 'error',
      isReady: st.loadState === 'ready',
      skeletons: [1, 2, 3, 4, 5, 6].map(k => ({ key: k })),
      simulateLoading: () => this.runLoad(),
      retryLoad: () => this.runLoad(),
      mapCols: isDesk ? 'minmax(0,1.15fr) minmax(0,1fr)' : 'minmax(0,1fr)',
      mapSource: st.mapSource,
      onMapSource: (e) => { const v = e.target.value; this.setState({ mapSource: v }); },
      modeLocationStyle: tabStyle(st.mapMode === 'location'),
      modeHeatStyle: tabStyle(st.mapMode === 'heat'),
      pickLocation: () => this.setState({ mapMode: 'location' }),
      pickHeat: () => this.setState({ mapMode: 'heat' }),
      mapModeNote: st.mapMode === 'heat' ? 'Shaded by merchant density' : 'Grouped by operating region',
      regions: regionData.map(r => {
        const on = st.mapRegion === r.code;
        const fill = st.mapMode === 'heat' ? heatColor(r.count) : '#0073BF';
        return {
          key: r.code, code: r.code, name: r.name, count: r.count,
          provinceText: r.provinces.length ? r.provinces.map(p => p.name).join(' · ') : 'No merchants yet',
          cardStyle: 'display:flex;flex-direction:column;gap:12px;border:1.5px solid ' + (on ? '#0073BF' : '#DFDFDF') + ';border-radius:8px;padding:16px;cursor:pointer;background:' + (on ? '#EAF6FD' : '#fff'),
          barStyle: 'height:100%;width:' + Math.round((r.count / maxRegion) * 100) + '%;background:' + fill,
          pick: () => this.setState(s2 => ({ mapRegion: s2.mapRegion === r.code ? null : r.code })),
          provinces: r.provinces.map(p => ({
            key: p.name, name: p.name, count: p.count,
            style: 'border-radius:999px;background:#F5F5F4;color:#373A36;font-size:11px;font-weight:600;padding:5px 10px'
          }))
        };
      }),
      hasRegionPick: !!st.mapRegion,
      clearRegion: () => this.setState({ mapRegion: null }),
      mapListTitle: st.mapRegion ? st.mapRegion + ' merchants' : 'All merchants',
      mapListSub: mapList.length + ' merchants · ' + st.mapSource,
      mapEmpty: mapList.length === 0,
      mapRows: mapList.map(m => ({
        key: m.id, initial: m.initial, name: m.name, province: m.province, region: m.region, source: m.source,
        status: m.status, statusStyle: statusChip(m.status),
        open: () => this.openDetail(m.id)
      })),
      rangeOpen: st.rangeOpen,
      toggleRange: () => this.setState(s2 => ({ rangeOpen: !s2.rangeOpen })),
      rangeLabel: rangeLabel,
      rangeBtnStyle: 'border-radius:8px;background:#fff;border:1.5px solid ' + (st.rangeOpen ? '#0073BF' : '#DFDFDF') + ';display:flex;align-items:center;gap:10px;padding:8px 16px;font-size:13px;font-weight:600;color:#373A36;cursor:pointer',
      customOpen: st.range === 'custom',
      rangeFrom: st.rangeFrom, rangeTo: st.rangeTo,
      setRangeFrom: (e) => { const v = e.target.value; this.setState({ rangeFrom: v }); },
      setRangeTo: (e) => { const v = e.target.value; this.setState({ rangeTo: v }); },
      applyRange: () => { this.setState({ rangeOpen: false }); this.toast('Date range applied (demo)'); },
      rangeOptions: rangeDefs.map(r => ({
        key: r.id, label: r.label,
        style: 'border:none;background:transparent;font-family:inherit;width:100%;display:flex;align-items:center;justify-content:space-between;gap:12px;border-radius:6px;padding:10px 12px;font-size:13px;font-weight:' + (st.range === r.id ? '700' : '500') + ';color:' + (st.range === r.id ? '#0073BF' : '#373A36') + ';cursor:pointer',
        checkStyle: 'color:#0073BF;font-weight:700;visibility:' + (st.range === r.id ? 'visible' : 'hidden'),
        pick: () => { this.setState({ range: r.id, rangeOpen: r.id === 'custom' }); if (r.id !== 'custom') this.toast(r.label + ' applied (demo)'); }
      })),
      openKpiTotal: openKpi('total'), openKpiApproved: openKpi('approved'),
      openKpiPending: openKpi('pending'), openKpiRejected: () => this.setState({ page: 'commission' }),
      drawerOpen: !!dk,
      drawerWidth: isMobile ? '100%' : isTablet ? '440px' : '520px',
      drawerTitle: dk ? dk.title : '',
      drawerSub: rangeLabel,
      closeDrawer: () => this.setState({ drawer: null }),
      drawerSearch: st.drawerSearch,
      onDrawerSearch: (e) => { const v = e.target.value; this.setState({ drawerSearch: v, drawerPage: 0 }); },
      drawerSource: st.drawerSource,
      onDrawerSource: (e) => { const v = e.target.value; this.setState({ drawerSource: v, drawerPage: 0 }); },
      drawerRegion: st.drawerRegion,
      onDrawerRegion: (e) => { const v = e.target.value; this.setState({ drawerRegion: v, drawerPage: 0 }); },
      drawerCount: drawerAll.length + ' merchants',
      drawerEmpty: drawerAll.length === 0,
      drawerRows: pageRows.map(m => ({
        key: m.id, initial: m.initial, name: m.name, mid: m.mid, province: m.province, region: m.region,
        status: m.status, statusStyle: statusChip(m.status),
        open: () => { this.setState({ drawer: null }); this.openDetail(m.id); }
      })),
      drawerPageText: drawerAll.length ? 'Page ' + (page + 1) + ' of ' + pages : 'No results',
      drawerPrevStyle: pgBtn(page > 0),
      drawerNextStyle: pgBtn(page < pages - 1),
      drawerPrev: () => { if (page > 0) this.setState({ drawerPage: page - 1 }); },
      drawerNext: () => { if (page < pages - 1) this.setState({ drawerPage: page + 1 }); },
      langEnStyle: 'border:none;background:transparent;font-family:inherit;padding:8px 12px;cursor:pointer;' + (st.lang === 'en' ? 'background:#0073BF;color:#fff' : 'background:#fff;color:#696B68'),
      langViStyle: 'background:transparent;font-family:inherit;border:none;padding:8px 12px;cursor:pointer;border-left:1px solid #DFDFDF;' + (st.lang === 'vi' ? 'background:#0073BF;color:#fff' : 'background:#fff;color:#696B68'),
      setEn: () => this.setState({ lang: 'en' }), setVi: () => this.setState({ lang: 'vi' }),
      bellStyle: 'position:relative;height:36px;width:36px;flex-shrink:0;border:1px solid ' + (st.notifOpen ? '#0073BF' : '#DFDFDF') + ';border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:' + (st.notifOpen ? '#0073BF' : '#373A36') + ';background:' + (st.notifOpen ? '#EAF6FD' : '#fff'),
      notifOpen: st.notifOpen,
      toggleNotif: () => this.setState(s2 => ({ notifOpen: !s2.notifOpen, profileOpen: false })),
      profileOpen: st.profileOpen,
      profileExpanded: st.profileOpen ? 'true' : 'false',
      toggleProfile: () => this.setState(s2 => ({ profileOpen: !s2.profileOpen, notifOpen: false })),
      notifWidth: isMobile ? '300px' : '360px',
      unreadCount: st.notifications.filter(n => !n.read).length,
      hasUnread: st.notifications.some(n => !n.read),
      noNotif: st.notifications.length === 0,
      markAllRead: () => this.setState(s2 => ({ notifications: s2.notifications.map(n => Object.assign({}, n, { read: true })) })),
      notifications: st.notifications.map(n => ({
        key: n.id, title: n.title, body: n.body, ts: n.ts,
        rowStyle: 'display:flex;gap:12px;padding:14px 16px;border-bottom:1px solid #EDEDED;cursor:pointer;background:' + (n.read ? '#fff' : '#EAF6FD'),
        dotStyle: 'height:8px;width:8px;flex-shrink:0;margin-top:6px;border-radius:999px;background:' + (n.read ? '#DFDFDF' : '#0073BF'),
        open: () => { this.setState(s2 => ({ notifications: s2.notifications.map(x => x.id === n.id ? Object.assign({}, x, { read: true }) : x), ...(n.jobId ? {page:'downloads',notifOpen:false}: {}) })); if(n.jobId) window.MMSFinance.download(this,n.jobId); }
      })),
      canDecide: false,
      decided: false,
      decidedNote: '',
      askApprove: () => { if (approveBlocked) { this.toast(approveReason); return; } this.setState({ modal: { type: 'approve', id: st.detailId }, reason: '', reasonError: false }); },
      askReject: () => this.setState({ modal: { type: 'reject', id: st.detailId }, reason: '', reasonError: false }),
      modalOpen: !!st.modal,
      isReject: !!st.modal && (st.modal.type === 'reject' || st.modal.type === 'apvReject'),
      modalTitle: !st.modal ? '' : (mt === 'approve' ? t.approveTitle
        : mt === 'reject' ? t.rejectTitle
        : mt === 'apvApprove' ? 'Approve application'
        : mt === 'apvReject' ? 'Reject application'
        : 'Disable Payment Link'),
      modalBody: !st.modal ? '' : (mt === 'approve' && d
        ? 'Approving ' + d.name + ' (' + d.mid + ') activates the merchant and notifies the onboarding team. This demo only changes local state.'
        : mt === 'reject' && d
        ? 'Rejecting ' + d.name + ' (' + d.mid + ') sends the application back to the merchant. A reason is required and is stored in the audit trail.'
        : mt === 'apvApprove' && av
        ? 'Approving ' + av.name + ' (' + av.gatewayId + ' / ' + av.mid + ') creates the merchant record in Businesses' + (av.plEnabled ? ', registers the Payment Link service (switched off until enabled)' : '') + ' and writes the decision to the audit log.'
        : mt === 'apvReject' && av
        ? 'Rejecting ' + av.name + ' returns the application to the maker. A reason is required, is shown in the Approvals list and is stored in the audit log.'
        : 'Merchants will no longer be able to create payment links. Existing unpaid links stay valid until they expire.'),
      modalConfirm: !st.modal ? '' : (mt === 'approve' || mt === 'apvApprove' ? t.approve
        : mt === 'disableLink' ? 'Disable service' : t.reject),
      confirmStyle: 'border:none;font-family:inherit;border-radius:8px;padding:12px 24px;font-size:14px;font-weight:700;cursor:pointer;color:#fff;background:' + (mt === 'reject' || mt === 'apvReject' || mt === 'disableLink' ? '#0D3C7D' : '#0073BF'),
      closeModal: () => this.setState({ modal: null, reason: '', reasonError: false }),
      reason: st.reason,
      reasonError: st.reasonError,
      reasonBorder: st.reasonError ? '#0D3C7D' : '#DFDFDF',
      onReason: (e) => { const v = e.target.value; this.setState({ reason: v, reasonError: false }); },
      confirmDecision: () => {
        if (mt === 'apvApprove') return approveApv();
        if (mt === 'apvReject') return rejectApv();
        if (mt === 'disableLink') return disableLink();
        return decide(mt === 'approve');
      },
      dashboardEntity: st.dashboardEntity,
      dashboardTabs: ['ALL', 'PVCB', 'VIETPAY'].map(x => ({ key:x, label:x, style: 'border:none;border-radius:6px;padding:8px 16px;font-size:13px;font-weight:700;cursor:pointer;background:' + (st.dashboardEntity === x ? '#0073BF;color:#fff' : 'transparent;color:#696B68'), pick: () => this.setState({ dashboardEntity:x }) })),
      dashboardEntityLabel: st.dashboardEntity === 'ALL' ? 'All entities' : st.dashboardEntity === 'PVCB' ? 'PVCB' : 'VietPay',
      kpiTotal: all.length,
      kpiApproved: dashboardApproved,
      kpiPending: dashboardPending,
      kpiRejected: all.filter(m => !m.tid).length,
      kpiTxnCount: dashboardTxnRows.length,
      kpiTxnValue: this.fmtVnd(dashboardTxnValue),
      kpiCommission: this.fmtVnd(dashboardCommission),
      kpiSuccessRate: dashboardTxnRows.length ? ((dashboardTxnRows.filter(x => ['AUTHORIZED','SETTLED'].includes(x.status)).length / dashboardTxnRows.length) * 100).toFixed(1) + '%' : '—',
      isOverview: st.page === 'overview',
      isBusinesses: st.page === 'businesses',
      isDetail: st.page === 'detail' && !!d,
      goOverview: () => this.setState({ page: 'overview' }),
      goBusinesses: () => { this.setState({ page: 'businesses', detailId: null }); if (st.page !== 'businesses') this.runLoad(); },
      tabOverviewColor: st.page === 'overview' ? '#0073BF' : '#696B68',
      tabBizColor: (st.page === 'businesses' || st.page === 'detail') ? '#0073BF' : '#696B68',
      navOverview: nav(st.page === 'overview'),
      navBusinesses: nav(st.page === 'businesses' || st.page === 'detail'),
      filtersOpen: st.filtersOpen,
      toggleFilters: () => this.setState(s2 => ({ filtersOpen: !s2.filtersOpen })),
      filtersBtn: 'display:flex;align-items:center;gap:8px;border-radius:8px;padding:10px 16px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid ' + (st.filtersOpen ? '#0073BF' : '#DFDFDF') + ';background:' + (st.filtersOpen ? '#EAF6FD' : '#fff') + ';color:' + (st.filtersOpen ? '#0073BF' : '#373A36'),
      filterCols: isMobile ? 'minmax(0,1fr)' : isTablet ? 'repeat(2,minmax(0,1fr))' : 'repeat(4,minmax(0,1fr))',
      tabAll: tabStyle(st.tab === 'all'), tabVietpay: tabStyle(st.tab === 'vietpay'), tabPvcom: tabStyle(st.tab === 'pvcom'),
      cntAllStyle: countStyle(st.tab === 'all'), cntVpStyle: countStyle(st.tab === 'vietpay'), cntPvStyle: countStyle(st.tab === 'pvcom'),
      cntAll: all.length, cntVp: all.filter(m => m.source === 'VIETPAY').length, cntPv: all.filter(m => m.source === 'PVCOM').length,
      pickAll: () => this.setState({ tab: 'all' }), pickVietpay: () => this.setState({ tab: 'vietpay' }), pickPvcom: () => this.setState({ tab: 'pvcom' }),
      businessStatusValue: fl.status,
      onBusinessStatus: (e) => { const v = e.target.value; this.setState(s2 => ({ filters: Object.assign({}, s2.filters, { status: v }), draft: Object.assign({}, s2.draft, { status: v }) })); },
      search: st.search,
      onSearch: (e) => this.setState({ search: e.target.value }),
      hasBusinessSearch: st.search.length > 0,
      clearBusinessSearch: () => this.setState({ search: '' }),
      draft: st.draft,
      setEntity: setDraft('entity'), setKyc: setDraft('kyc'), setLinkFilter: setDraft('link'),
      setFrom: setDraft('from'), setTo: setDraft('to'), setProvince: setDraft('province'), setMcc: setDraft('mcc'),
      applyFilters: () => { this.setState(s2 => ({ filters: Object.assign({}, s2.draft) })); this.toast('Filters applied'); },
      clearFilters: () => this.setState({ tab: 'all', filters: this.blankFilters(), draft: this.blankFilters(), search: '' }),
      chips: chipsList,
      hasChips: chipsList.length > 0,
      sortKey: st.sortKey,
      onSortKey: (e) => this.setState({ sortKey: e.target.value }),
      sortDirLabel: st.sortDir === 'asc' ? 'Ascending' : 'Descending',
      toggleSortDir: () => this.setState(s2 => ({ sortDir: s2.sortDir === 'asc' ? 'desc' : 'asc' })),
      resultCount: rowsRaw.length,
      showingText: rowsRaw.length ? 'Showing 1 to ' + rowsRaw.length + ' of ' + rowsRaw.length + ' entries' : 'No entries',
      isEmpty: rowsRaw.length === 0,
      showTable: !isMobile && rowsRaw.length > 0,
      showCards: isMobile && rowsRaw.length > 0,
      tableMinWidth: isMobile ? '0' : 'max-content',
      tableCols: '260px 120px 150px 170px 130px 130px 170px 210px 110px 140px 130px 130px 200px 160px 200px 110px 120px 90px 72px',
      rows: rowsRaw.map(m => ({
        key: m.id, initial: m.initial, name: m.name, mid: m.mid, tid: m.tid || 'Not assigned', tidStyle: m.tid ? 'font-weight:700;color:#0073BF' : 'font-weight:600;color:#B27C12', entity: m.entity, ctype: m.source, status: m.businessStatus || 'ACTIVE',
        date: this.fmtDate(m.date), phone: m.phone, email: m.email, kyc: m.kyc, state: m.province, city: m.city,
        regCode: m.regCode, branchCode: m.branchCode, branchName: m.branchName, region: m.region, cif: m.cif, mcc: m.mcc,
        typeStyle: typeChip(m.source), statusStyle: statusChip(m.businessStatus || 'ACTIVE'), kycStyle: kycChip(m.kyc),
        open: () => this.openDetail(m.id)
      })),
      d: d ? Object.assign({}, d, {
        dateText: this.fmtDate(d.date),
        businessStatus: d.businessStatus || 'ACTIVE', tidText: d.tid || 'Not assigned', tidStyle: d.tid ? 'color:#0073BF' : 'color:#B27C12',
        posText: d.posDevice || 'No POS assigned', posSerialText: d.posSerial ? 'Serial: ' + d.posSerial : 'Assign a POS terminal to issue a TID',
        statusStyle: statusChip(d.businessStatus || 'ACTIVE'), kycStyle: kycChip(d.kyc), typeStyle: typeChip(d.source),
        linkStateStyle: plChip(plState), linkStateText: plText,
        audit: d.audit.map((a, i) => ({ key: i, ts: a.ts, actor: a.actor, action: a.action, status: a.status }))
      }) : null,
      plStateStyle: plChip(plState), plStateText: plText, plStateNote: plNote,
      plLocked: plLocked, plLockReason: plLockReason,
      plToggleTitle: plLocked ? plLockReason : (ld.enabled ? 'Disable Payment Link' : 'Enable Payment Link'),
      fieldStyle: fieldStyle(false, plLocked),
      feeFieldStyle: fieldStyle(!!feeErr, plLocked),
      feeLabel: ld.feeType === 'Percentage' ? 'Fee Value (%)' : 'Fee Value (VND)',
      feePlaceholder: ld.feeType === 'Percentage' ? 'e.g. 1.2' : 'e.g. 5000',
      feeError: feeErr,
      saveDisabled: plLocked || !!cfgIssue,
      saveHint: plLocked ? 'Approve the merchant to edit this configuration.' : (cfgIssue || ''),
      hasSaveHint: !!(plLocked || cfgIssue),
      saveBtnStyle: 'border:none;font-family:inherit;border-radius:8px;padding:12px 28px;font-size:14px;font-weight:700;color:#fff;background:#0073BF;' + (plLocked || cfgIssue ? 'opacity:.45;cursor:not-allowed' : 'cursor:pointer'),
      approveDisabled: approveBlocked,
      approveBlocked: approveBlocked,
      approveBlockReason: approveReason,
      approveTitle: approveBlocked ? approveReason : 'Approve this merchant',
      approveBtnStyle: 'display:flex;align-items:center;gap:8px;border:none;font-family:inherit;background:#0073BF;color:#fff;border-radius:8px;padding:12px 24px;font-size:14px;font-weight:700;' + (approveBlocked ? 'opacity:.45;cursor:not-allowed' : 'cursor:pointer'),
      isApps: st.page === 'apps',
      isAppDetail: st.page === 'appDetail' && !!ap,
      goApps: () => this.setState({ page: 'apps', appId: null }),
      navApps: nav(st.page === 'apps' || st.page === 'appDetail'),
      tabAppsColor: (st.page === 'apps' || st.page === 'appDetail') ? '#0073BF' : '#696B68',
      appSearch: st.appSearch,
      onAppSearch: (e) => { const v = e.target.value; this.setState({ appSearch: v, appPage: 0 }); },
      appSrcAll: tabStyle(st.appSrc === 'all'), appSrcPv: tabStyle(st.appSrc === 'PVCOM'), appSrcVp: tabStyle(st.appSrc === 'VIETPAY'),
      appSrcAllPressed: st.appSrc === 'all', appSrcPvPressed: st.appSrc === 'PVCOM', appSrcVpPressed: st.appSrc === 'VIETPAY',
      appSrcCntAllStyle: countStyle(st.appSrc === 'all'), appSrcCntPvStyle: countStyle(st.appSrc === 'PVCOM'), appSrcCntVpStyle: countStyle(st.appSrc === 'VIETPAY'),
      appSrcCntAll: st.apps.length,
      appSrcCntPv: st.apps.filter(x => x.source === 'PVCOM').length,
      appSrcCntVp: st.apps.filter(x => x.source === 'VIETPAY').length,
      appSrcAllPick: () => this.setState({ appSrc: 'all', appPage: 0 }),
      appSrcPvPick: () => this.setState({ appSrc: 'PVCOM', appPage: 0 }),
      appSrcVpPick: () => this.setState({ appSrc: 'VIETPAY', appPage: 0 }),
      appStatusValue: st.appTab,
      onAppStatus: (e) => { const v = e.target.value; this.setState({ appTab: v, appPage: 0 }); },
      appRangeText: appTotal === 0 ? 'No results' : (appPageIdx * st.appPer + 1) + '–' + Math.min(appTotal, appPageIdx * st.appPer + st.appPer) + ' of ' + appTotal + ' applications',
      appPageText: 'Page ' + (appPageIdx + 1) + ' of ' + appPages,
      appPer: String(st.appPer),
      appPerOpts: [10, 25, 50].map(n => ({ key: n, v: String(n) })),
      setAppPer: (e) => { const val = parseInt(e.target.value, 10); this.setState({ appPer: val, appPage: 0 }); },
      appPrev: () => this.setState(s2 => ({ appPage: Math.max(0, s2.appPage - 1) })),
      appNext: () => this.setState(s2 => ({ appPage: Math.min(appPages - 1, s2.appPage + 1) })),
      appPrevStyle: pgBtn(appPageIdx > 0), appNextStyle: pgBtn(appPageIdx < appPages - 1),
      appShowTable: !isMobile && appList.length > 0,
      appShowCards: isMobile && appList.length > 0,
      appEmpty: appList.length === 0,
      appRows: appSlice.map(x => ({
        key: x.id, id: x.id, name: x.name, source: x.source, kyc: x.kyc, status: x.status,
        date: this.fmtDate(x.date),
        sourceStyle: typeChip(x.source), kycStyle: kycChip(x.kyc), statusStyle: statusChip(x.status),
        services: appServices(x),
        open: () => this.openApp(x.id)
      })),
      a: ap ? Object.assign({}, ap, {
        documentSummary: (ap.documents || []).map((document, i) => ({ key: i, name: document.name, uploadStatus: document.status === 'Missing' ? 'Not uploaded' : 'Uploaded' })),
        date: this.fmtDate(ap.date),
        statusStyle: statusChip(ap.status), kycStyle: kycChip(ap.kyc), sourceStyle: typeChip(ap.source),
        services: appServices(ap),
        plStyle: ap.plEnabled ? chip('#EAF6FD', '#0073BF') : chip('#E6E6E4', '#696B68'),
        plText: ap.plEnabled ? 'LINK REQUESTED' : 'NO LINK',
        audit: ap.audit.map((ev, i) => ({ key: i, ts: ev.ts, actor: ev.actor, action: ev.action, status: ev.status }))
      }) : null,
      appServiceOptions: [{ key: 'POS', label: 'POS' }, { key: 'SOUNDBOX', label: 'SoundBox S20' }, { key: 'PAYMENT_LINK', label: 'Payment Link' }].map(option => {
        const checked = option.key === 'PAYMENT_LINK' ? !!da.plEnabled : (da.deviceRequests || []).includes(option.key);
        return Object.assign({}, option, {
          checked,
          style: 'display:flex;align-items:center;gap:12px;min-height:48px;min-width:0;border:1.5px solid ' + (checked ? '#0073BF' : '#DFDFDF') + ';border-radius:8px;padding:14px;cursor:pointer;background:' + (checked ? '#EAF6FD' : '#fff'),
          toggle: () => this.setState(s2 => {
            const draft = s2.draftApp;
            if (option.key === 'PAYMENT_LINK') return { draftApp: Object.assign({}, draft, { plEnabled: !draft.plEnabled }) };
            const devices = draft.deviceRequests || [];
            return { draftApp: Object.assign({}, draft, { deviceRequests: devices.includes(option.key) ? devices.filter(device => device !== option.key) : devices.concat(option.key) }) };
          })
        });
      }),
      draftApp: da,
      appFieldStyle: fieldStyle(false, false),
      appFeeFieldStyle: fieldStyle(!!appFeeErr, false),
      appFeeLabel: da.feeType === 'Percentage' ? 'Fee Value (%)' : 'Fee Value (VND)',
      appFeePlaceholder: da.feeType === 'Percentage' ? 'e.g. 1.5' : 'e.g. 5000',
      appFeeError: appFeeErr,
      appPlBorder: da.plEnabled ? '#0073BF' : '#DFDFDF',
      appPlBg: da.plEnabled ? '#EAF6FD' : '#fff',
      setAppTrading: setApp('trading'), setAppMcc: setApp('mcc'), setAppKyc: setApp('kyc'),
      setAppDescEn: setApp('descEn'), setAppDescVi: setApp('descVi'),
      setAppActEn: setApp('actEn'), setAppActVi: setApp('actVi'),
      setAppChannel: setApp('channel'), setAppFeeType: setApp('feeType'),
      setAppFeeValue: setApp('feeValue'), setAppValidity: setApp('validity'),
      toggleAppPl: () => this.setState(s2 => ({ draftApp: Object.assign({}, s2.draftApp, { plEnabled: !s2.draftApp.plEnabled }) })),
      toggleAppCancel: () => this.setState(s2 => ({ draftApp: Object.assign({}, s2.draftApp, { allowCancel: !s2.draftApp.allowCancel }) })),
      appCancelStyle: toggleStyle(da.allowCancel, false),
      appSaveDisabled: !!appIssue,
      appSaveHint: appIssue || '',
      appSaveBtnStyle: 'border:none;font-family:inherit;border-radius:8px;padding:12px 28px;font-size:14px;font-weight:700;color:#fff;background:#0073BF;' + (appIssue ? 'opacity:.45;cursor:not-allowed' : 'cursor:pointer'),
      saveApp: () => {
        if (appIssue) return;
        const id = st.appId, draft = Object.assign({}, st.draftApp);
        this.setState(s2 => ({
          apps: s2.apps.map(x => x.id === id ? Object.assign({}, x, draft, {
            audit: x.audit.concat([{ ts: 'Just now', actor: 'Duy Nguyen', action: 'Application details saved — services: ' + (appServices(draft).map(service => service.label).join(', ') || 'None'), status: 'Saved' }])
          }) : x)
        }));
        this.toast('Application saved (demo)');
      },
      appHasMissing: appMissing.length > 0,
      appMissingNote: appMissing.length ? 'Missing before the bank can approve: ' + appMissing.join(' · ') : '',
      submitLabel: ap && (ap.status === 'CHANGES REQUESTED' || ap.status === 'REJECTED') ? 'Resubmit to bank' : 'Submit to bank',
      submitDisabled: !ap || ap.status === 'APPROVED',
      submitTitle: !ap ? '' : ap.status === 'APPROVED' ? 'Already approved' : ap.status === 'REJECTED' ? 'Update the rejected application, then resubmit it for approval' : 'Send this application to the bank for approval',
      submitBtnStyle: 'display:flex;align-items:center;gap:8px;border:none;font-family:inherit;background:#0073BF;color:#fff;border-radius:8px;padding:12px 24px;font-size:14px;font-weight:700;' + (!ap || ap.status === 'APPROVED' ? 'opacity:.45;cursor:not-allowed' : 'cursor:pointer'),
      submitApp: () => {
        if (!ap || ap.status === 'APPROVED') return;
        const id = st.appId, now = this.nowStamp(), nm = ap.name, resubmitting = ap.status === 'REJECTED' || ap.status === 'CHANGES REQUESTED';
        this.setState(s2 => ({
          apps: s2.apps.map(x => x.id === id ? Object.assign({}, x, { status: 'PENDING', updatedOn: now, reason: '', additionalImagesRequired: false, requestedItems: [], docsUpdated: false, audit: x.audit.concat([{ ts: now, actor: 'Duy Nguyen', action: resubmitting ? 'Application updated and resubmitted to bank' : 'Submitted to bank for approval', status: 'Submitted' }]) }) : x),
          notifications: [{ id: 'n' + Date.now(), title: resubmitting ? 'Application resubmitted' : 'Submitted to bank', body: nm + ' is now waiting for an approval decision.', ts: 'Just now', read: false }].concat(s2.notifications)
        }));
        this.toast(resubmitting ? 'Application updated and resubmitted (demo)' : 'Submitted to bank (demo)');
      },
      openApvFromApp: () => this.openApproval(st.appId),
      ld: ld,
      ldEnabledText: ld.enabled ? 'Enabled' : 'Disabled',
      ldToggleStyle: toggleStyle(ld.enabled, plLocked),
      toggleLinkEnabled: () => {
        if (plLocked) { this.toast(plLockReason); return; }
        if (ld.enabled) { this.setState({ modal: { type: 'disableLink', id: st.detailId } }); return; }
        this.setState(s2 => ({ linkDraft: Object.assign({}, s2.linkDraft, { enabled: true, registered: true }) }));
      },
      setPaySource: (e) => setLink('paySource', e.target.value),
      setFeeType: (e) => setLink('feeType', e.target.value),
      setFeeValue: (e) => setLink('feeValue', e.target.value),
      setValidity: (e) => setLink('validity', e.target.value),
      allowCancelStyle: toggleStyle(ld.allowCancel, plLocked),
      toggleAllowCancel: () => { if (plLocked) { this.toast(plLockReason); return; } setLink('allowCancel', !ld.allowCancel); },
      saveLinkConfig: () => {
        if (plLocked || cfgIssue) { this.toast(plLocked ? plLockReason : cfgIssue); return; }
        const id = st.detailId, draftLink = Object.assign({}, st.linkDraft, { require3ds: true, registered: true });
        this.setState(s2 => ({
          merchants: s2.merchants.map(m => m.id === id ? Object.assign({}, m, {
            link: draftLink,
            audit: m.audit.concat([{ ts: 'Just now', actor: 'Duy Nguyen', action: draftLink.enabled !== m.link.enabled ? (draftLink.enabled ? 'Payment Link enabled' : 'Payment Link disabled') : 'Configuration updated', status: draftLink.enabled ? 'Enabled' : 'Disabled' }])
          }) : m)
        }));
        this.toast('Payment Link configuration saved (demo)');
      },
      detailCols: isDesk ? 'repeat(3,minmax(0,1fr))' : isTablet ? 'repeat(2,minmax(0,1fr))' : 'minmax(0,1fr)',
      detailTwo: isMobile ? 'minmax(0,1fr)' : 'repeat(2,minmax(0,1fr))',
      toast: st.toast,
      hasToast: !!st.toast,
      widthLabel: w + 'px · ' + mode,
      isMobile, isTablet, isDesktop: isDesk,
      toggleRail: () => this.setState(s2 => ({ railForced: !s2.railForced })),
      railGlyph: rail ? '›' : '‹',
      sidebarPad: rail ? '0 12px 12px' : '0 16px 32px',
      sidebarHeaderJustify: rail ? 'center' : 'space-between',
      sidebarGap: rail ? '20px' : '24px',
      sidebarProfileStyle: rail ? 'align-self:stretch;display:flex;align-items:center;justify-content:center' : 'align-self:stretch;display:flex;align-items:center;justify-content:flex-start;gap:10px;padding:10px;border:1px solid rgba(255,255,255,.14);border-radius:8px;background:rgba(255,255,255,.07);box-sizing:border-box',
      sidebarAvatarSize: rail ? '40px' : '36px',
      menuAlign: rail ? 'center' : 'stretch',
      itemJustify: rail ? 'center' : 'flex-start',
      showSidebar: !isMobile,
      showLabels: !rail,
      sidebarWidth: rail ? '72px' : '260px',
      pagePad: isMobile ? '16px' : isTablet ? '24px' : '32px',
      sectionGap: isMobile ? '20px' : isTablet ? '24px' : '32px',
      cardPad: isMobile ? '14px' : '12px',
      kpiCols: isMobile ? 'repeat(2,minmax(0,1fr))' : isTablet ? 'repeat(3,minmax(0,1fr))' : 'repeat(6,minmax(0,1fr))',
      metricCols: isMobile ? 'minmax(0,1fr)' : 'repeat(2,minmax(0,1fr))',
      twoCols: isDesk ? 'minmax(0,1fr) minmax(0,1fr)' : 'minmax(0,1fr)',
      headerDir: isDesk ? 'row' : 'column',
      headerAlign: isDesk ? 'center' : 'flex-start',
      h1Size: isMobile ? '18px' : isTablet ? '20px' : '24px',
      kpiSize: isMobile ? '20px' : '20px'
    };
  }
}

  }
  const source = applicationSource.toString();
  document.querySelector("script[data-dc-script]").textContent = source.slice(source.indexOf("{") + 1, source.lastIndexOf("}"));
})();
