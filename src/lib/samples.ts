// Synthetic sample documents for the demo. NO real personal data.
// Deadlines are computed relative to today so urgency always demos correctly.

function addDays(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

function longDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export interface Sample {
  id: string;
  label: string;
  emoji: string;
  language: string; // suggested output language for the picker
  text: string;
}

export function getSamples(): Sample[] {
  return [
    {
      id: "school",
      label: "School exam form",
      emoji: "🏫",
      language: "en",
      text: `RIVERSIDE UNIFIED SCHOOL DISTRICT
Office of Gifted & Talented Programs

Dear Parent or Guardian,

Your child has been recommended to participate in the district's Specialized High School Admissions Test (SHSAT). This examination is used to determine eligibility for placement in our specialized academic high schools for the upcoming school year.

The examination is scheduled for ${longDate(addDays(40))}. In order for your child to sit for the examination, a signed Parental Consent and Information Release form must be returned to the main office no later than ${longDate(addDays(25))}.

Should the signed consent form not be received by the stated date, your child will be deemed ineligible to participate in this testing cycle. Please direct any questions to the Counseling Office during regular business hours.

Sincerely,
Office of Gifted & Talented Programs`,
    },
    {
      id: "eviction",
      label: "Eviction notice",
      emoji: "⚠️",
      language: "en",
      text: `NOTICE TO PAY RENT OR QUIT

To: Tenant(s) in possession of 4821 Maple Court, Apt 3B

YOU ARE HEREBY NOTIFIED that rent is now due and unpaid for the premises you currently occupy in the amount of $1,450.00, representing rent for the current month.

YOU ARE REQUIRED to pay the full amount due within FIVE (5) DAYS of service of this notice, on or before ${longDate(addDays(5))}, or to surrender possession of the premises.

If you fail to pay the amount due or vacate the premises within this period, legal proceedings will be initiated against you to recover possession of said premises, declare the forfeiture of your lease, and recover rents and damages.

This notice is served upon you pursuant to applicable state law.

Property Management Office`,
    },
    {
      id: "vaccine",
      label: "Vaccine record (Spanish)",
      emoji: "💉",
      language: "es",
      text: `CLÍNICA DE SALUD INFANTIL
Registro de Vacunación del Paciente

Nombre del paciente: [Menor]
Fecha de nacimiento: 12/03/2019

Este documento es un resumen de las vacunas que su hijo/a ha recibido hasta la fecha. Por favor consérvelo para sus registros escolares y médicos.

Vacunas administradas:
- DTaP (Difteria, Tétanos, Tosferina): Serie completa
- MMR (Sarampión, Paperas, Rubéola): 1 dosis administrada
- Varicela: 1 dosis administrada
- Hepatitis B: Serie completa

Próxima dosis recomendada (MMR, segunda dosis): ${longDate(addDays(210))}

Este registro es solo para fines informativos. No se requiere ninguna acción inmediata. Comuníquese con la clínica para programar futuras citas.`,
    },
  ];
}
