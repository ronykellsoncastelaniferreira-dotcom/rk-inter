
import React, { useState } from 'react';
import { User, Association, UserRole, PaymentStatus, RegistrationStatus, Idea, Announcement, IdeaStatus } from './types';
import { ASSOCIATIONS, MOCK_USER, MOCK_ANNOUNCEMENTS, MOCK_IDEAS } from './constants';
import Layout from './components/Layout';

const App: React.FC = () => {
  const [view, setView] = useState<'LOGIN' | 'SIGNUP' | 'APP'>('LOGIN');
  const [user, setUser] = useState<User | null>(null);
  const [association, setAssociation] = useState<Association | null>(ASSOCIATIONS[0]);
  const [tab, setTab] = useState('inicio');
  const [editingStatute, setEditingStatute] = useState(ASSOCIATIONS[0].statute);

  // Simulando banco de dados de solicitações
  const [pendingRequests, setPendingRequests] = useState<User[]>([
    {
      id: 'req-1',
      name: 'Carlos Oliveira',
      email: 'carlos@produtor.com',
      role: UserRole.MEMBER,
      associationId: 'coffee-assoc',
      status: PaymentStatus.PENDING,
      registrationStatus: RegistrationStatus.AWAITING_APPROVAL,
      startDate: '2024-05-20',
      limitDate: '2024-06-20',
      dueDate: '2024-06-20',
      contributionType: 'MENSAL'
    }
  ]);

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: UserRole.MEMBER,
      associationId: association?.id || 'coffee-assoc',
      status: PaymentStatus.PENDING,
      registrationStatus: RegistrationStatus.AWAITING_APPROVAL,
      startDate: new Date().toISOString(),
      limitDate: '',
      dueDate: '',
      contributionType: 'MENSAL'
    };
    setUser(newUser);
    setView('APP');
  };

  const loginAs = (role: UserRole) => {
    const mock = { ...MOCK_USER, role, registrationStatus: RegistrationStatus.APPROVED };
    if (role === UserRole.SUPPORT) {
      mock.name = "Técnico de Suporte";
      mock.email = "suporte@plataforma.com";
    }
    setUser(mock);
    setAssociation(ASSOCIATIONS[0]);
    setView('APP');
  };

  const handleApprove = (u: User, role: UserRole) => {
    if (user?.role !== UserRole.ADMIN) return;
    setPendingRequests(prev => prev.filter(r => r.id !== u.id));
    alert(`Usuário ${u.name} aprovado como ${role}. Log: Aprovado por ${user.name} em ${new Date().toLocaleString()}`);
  };

  const handleUpdateStatute = () => {
    if (user?.role !== UserRole.ADMIN) return;
    if (association) {
      setAssociation({ ...association, statute: editingStatute, statuteUpdatedAt: new Date().toLocaleDateString() });
      alert("Estatuto atualizado com sucesso!");
    }
  };

  if (view !== 'APP') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8 text-center">
          <div>
            <div className="w-20 h-20 bg-emerald-500 rounded-3xl mx-auto mb-6 flex items-center justify-center text-4xl shadow-xl">🤝</div>
            <h1 className="text-3xl font-bold text-white">AssociaMais</h1>
            <p className="text-slate-400 mt-2">Plataforma de Governança</p>
          </div>

          {view === 'LOGIN' ? (
            <div className="space-y-4">
              <button onClick={() => loginAs(UserRole.MEMBER)} className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold">Entrar como Associado</button>
              <button onClick={() => loginAs(UserRole.ADMIN)} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold">Entrar como Mesa Diretora</button>
              <button onClick={() => loginAs(UserRole.SUPPORT)} className="w-full py-4 bg-slate-800 text-slate-400 rounded-2xl font-bold border border-slate-700">Acesso Técnico (Suporte)</button>
              <div className="pt-4">
                <button onClick={() => setView('SIGNUP')} className="text-emerald-400 text-sm font-bold">Não tem conta? Cadastre-se</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4 text-left">
              <input required name="name" type="text" placeholder="Nome Completo" className="w-full p-4 bg-slate-800 border border-slate-700 rounded-2xl text-white" />
              <input required name="email" type="email" placeholder="E-mail" className="w-full p-4 bg-slate-800 border border-slate-700 rounded-2xl text-white" />
              <input required name="password" type="password" placeholder="Senha" className="w-full p-4 bg-slate-800 border border-slate-700 rounded-2xl text-white" />
              <button type="submit" className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold">Criar Cadastro</button>
              <button type="button" onClick={() => setView('LOGIN')} className="w-full text-slate-500 text-xs mt-2">Voltar ao Login</button>
            </form>
          )}
          <p className="text-[10px] text-slate-500 mt-8">O desenvolvedor possui acesso apenas técnico, sem acesso a dados sensíveis ou administrativos.</p>
        </div>
      </div>
    );
  }

  if (!user || !association) return null;

  if (user.registrationStatus === RegistrationStatus.AWAITING_APPROVAL) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8 text-center">
        <div className="max-w-xs space-y-6">
          <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-4xl mx-auto">⏳</div>
          <h2 className="text-2xl font-bold text-slate-900">Aguardando Aprovação</h2>
          <p className="text-sm text-slate-500">Seu cadastro foi enviado à <strong>Mesa Diretora</strong>. Você será notificado assim que seu acesso for liberado.</p>
          <button onClick={() => setView('LOGIN')} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold">Voltar</button>
        </div>
      </div>
    );
  }

  const isSupport = user.role === UserRole.SUPPORT;
  const isAdmin = user.role === UserRole.ADMIN;

  return (
    <Layout user={user} association={association} currentTab={tab} setTab={setTab}>
      <div className="space-y-6 animate-in fade-in duration-500">
        {tab === 'inicio' && (
          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-3xl text-white">
              <h2 className="text-xl font-bold">Olá, {isSupport ? 'Técnico' : user.name.split(' ')[0]}</h2>
              <p className="text-xs opacity-60 uppercase font-bold mt-1">{user.role}</p>
              <div className="mt-4 inline-block bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg text-[10px] font-bold border border-emerald-500/30">ACESSO LIBERADO</div>
            </div>
            
            <section className="space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2"><span className="w-1 h-4 bg-emerald-500 rounded-full"></span> Comunicados</h3>
              {MOCK_ANNOUNCEMENTS.map(ann => (
                <div key={ann.id} className="p-4 bg-white border rounded-2xl shadow-sm">
                  <h4 className="font-bold text-sm text-slate-900">{ann.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{ann.content}</p>
                </div>
              ))}
            </section>
          </div>
        )}

        {tab === 'usuarios' && isAdmin && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Gestão de Acessos</h2>
            {pendingRequests.length === 0 ? (
              <p className="text-center text-slate-400 py-10">Nenhuma solicitação pendente.</p>
            ) : (
              pendingRequests.map(req => (
                <div key={req.id} className="bg-white border-2 border-slate-100 p-5 rounded-3xl space-y-4">
                  <div>
                    <h4 className="font-bold text-slate-900">{req.name}</h4>
                    <p className="text-xs text-slate-500">{req.email}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => handleApprove(req, UserRole.MEMBER)} className="py-3 bg-emerald-600 text-white rounded-xl text-[11px] font-bold uppercase">Aprovar Associado</button>
                    <button onClick={() => handleApprove(req, UserRole.SUPPORT)} className="py-3 bg-slate-800 text-white rounded-xl text-[11px] font-bold uppercase">Aprovar Suporte</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === 'estatuto' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Estatuto Oficial</h2>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-4">Atualizado em: {association.statuteUpdatedAt}</p>
              {isAdmin ? (
                <div className="space-y-4">
                  <textarea 
                    className="w-full h-64 p-4 text-sm bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-emerald-500"
                    value={editingStatute}
                    onChange={(e) => setEditingStatute(e.target.value)}
                  />
                  <button onClick={handleUpdateStatute} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold">Salvar e Publicar</button>
                </div>
              ) : (
                <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{association.statute}</div>
              )}
            </div>
          </div>
        )}

        {tab === 'pagamento' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Financeiro</h2>
            {isSupport ? (
              <div className="p-10 text-center bg-slate-100 rounded-3xl text-slate-400">
                <span className="text-4xl block mb-2">🚫</span>
                <p className="text-sm font-bold">Acesso técnico limitado</p>
                <p className="text-xs mt-1">Dados financeiros são restritos à Mesa Diretora e Associados.</p>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b pb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase">Status</span>
                  <span className="text-sm font-bold text-emerald-600 uppercase">{user.status}</span>
                </div>
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-xs text-emerald-700 font-medium">
                  Funcionalidade de pagamento digital em fase de implementação.
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase">Vencimento</span>
                  <span className="text-sm font-bold text-slate-900">{user.dueDate}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'cadastro' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Perfil</h2>
            {isSupport ? (
              <div className="bg-slate-100 p-8 rounded-3xl text-center text-slate-500 italic text-sm">
                Dados pessoais ocultados no modo Suporte Técnico.
              </div>
            ) : (
              <div className="bg-white p-6 rounded-3xl border space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-xl font-bold border border-emerald-100">{user.name.charAt(0)}</div>
                  <div>
                    <h4 className="font-bold text-slate-900">{user.name}</h4>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
                <div className="pt-4 border-t space-y-2">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Papel: {user.role}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Associação: {association.name}</p>
                </div>
              </div>
            )}
            <button onClick={() => setView('LOGIN')} className="w-full py-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">Sair da Sessão</button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
