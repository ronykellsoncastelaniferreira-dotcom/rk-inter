
export enum UserRole {
  ADMIN = 'MESA DIRETORA',
  MEMBER = 'ASSOCIADO',
  SUPPORT = 'SUPORTE TÉCNICO'
}

export enum PaymentStatus {
  PENDING = 'PENDENTE',
  ACTIVE = 'ATIVO',
  OVERDUE = 'EM_ATRASO',
  BLOCKED = 'BLOQUEADO'
}

export enum RegistrationStatus {
  AWAITING_APPROVAL = 'AGUARDANDO APROVAÇÃO',
  APPROVED = 'APROVADO',
  REJECTED = 'REJEITADO'
}

export enum IdeaStatus {
  SUGGESTED = 'SUGESTÃO',
  UNDER_REVIEW = 'EM_ANÁLISE',
  APPROVED = 'APROVADO',
  REJECTED = 'REPROVADO',
  POSTPONED = 'ADIADO'
}

export interface ApprovalLog {
  approvedBy: string;
  date: string;
}

export interface Association {
  id: string;
  name: string;
  brandColor: string;
  logoUrl?: string;
  minSupportsForDirectorReview: number;
  pixKey: string;
  monthlyValue: number;
  annualValue: number;
  statute: string;
  statuteUpdatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  associationId: string;
  status: PaymentStatus;
  registrationStatus: RegistrationStatus;
  approvalLog?: ApprovalLog;
  startDate: string;
  limitDate: string;
  dueDate: string;
  contributionType: 'MENSAL' | 'ANUAL';
}

export interface Announcement {
  id: string;
  associationId: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export interface Idea {
  id: string;
  associationId: string;
  authorId: string;
  authorName: string;
  title: string;
  category: 'EVENTO' | 'MELHORIA' | 'PROBLEMA' | 'INVESTIMENTO';
  description: string;
  supports: string[];
  status: IdeaStatus;
  date: string;
}
