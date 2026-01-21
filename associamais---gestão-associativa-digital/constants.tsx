
import { Association, User, UserRole, PaymentStatus, Announcement, Idea, IdeaStatus, RegistrationStatus } from './types';

export const ASSOCIATIONS: Association[] = [
  { 
    id: 'coffee-assoc', 
    name: 'Assoc. Produtores de Café do Cerrado', 
    brandColor: '#4b3621', 
    minSupportsForDirectorReview: 3,
    pixKey: '00.123.456/0001-99 (CNPJ)',
    monthlyValue: 50.00,
    annualValue: 550.00,
    statute: 'Artigo 1º - A Associação tem por finalidade promover a união entre produtores de café...',
    statuteUpdatedAt: '2024-01-10'
  },
  { 
    id: 'dairy-assoc', 
    name: 'Cooperativa Láctea Sul', 
    brandColor: '#1e40af', 
    minSupportsForDirectorReview: 5,
    pixKey: 'financeiro@cooplactea.com.br (E-mail)',
    monthlyValue: 40.00,
    annualValue: 440.00,
    statute: 'Regimento Interno: Todos os cooperados devem seguir as normas de qualidade...',
    statuteUpdatedAt: '2024-02-15'
  }
];

export const MOCK_USER: User = {
  id: 'user-123',
  name: 'João da Silva',
  email: 'joao@cafe.com',
  role: UserRole.MEMBER,
  associationId: 'coffee-assoc',
  status: PaymentStatus.PENDING,
  // Fix: Added missing registrationStatus property
  registrationStatus: RegistrationStatus.APPROVED,
  startDate: '2024-01-01',
  limitDate: '2024-12-31',
  dueDate: '2024-05-15',
  contributionType: 'ANUAL'
};

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    associationId: 'coffee-assoc',
    title: 'Previsão de Safra 2024',
    content: 'Estimamos um crescimento de 15% na produção regional devido às chuvas regulares.',
    date: '2024-05-01',
    author: 'Diretoria Executiva'
  }
];

export const MOCK_IDEAS: Idea[] = [
  {
    id: 'idea-1',
    associationId: 'coffee-assoc',
    authorId: 'user-456',
    authorName: 'Maria Oliveira',
    title: 'Compra Coletiva de Adubos',
    category: 'INVESTIMENTO',
    description: 'Se comprarmos juntos, o frete e o preço unitário caem drasticamente.',
    supports: ['user-789'],
    status: IdeaStatus.UNDER_REVIEW,
    date: '2024-04-20'
  }
];
