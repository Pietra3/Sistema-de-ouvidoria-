import { useState } from "react";

type RoleKey =
  | "operador"
  | "gestor"
  | "interlocutor"
  | "etica"
  | "investigador"
  | "admin"
  | "tecnico"
  | "auditor";

const ROLES: Array<[RoleKey, string]> = [
  ["operador", "Operador"],
  ["gestor", "Gestor da Ouvidoria"],
  ["interlocutor", "Interlocutor"],
  ["etica", "Comissão de Ética"],
  ["investigador", "Investigador"],
  ["admin", "Administrador"],
  ["tecnico", "Administrador técnico"],
  ["auditor", "Auditor"],
];

const PEOPLE: Record<RoleKey, [string, string]> = {
  operador: ["Ana Paula Ribeiro", "Operadora · Ouvidoria Sebrae/GO"],
  gestor: ["Marina Queiroz", "Gestora · Ouvidoria Nacional"],
  interlocutor: ["Rafael Lima", "Interlocutor · Unidade de Capacitação GO"],
  etica: ["Helena Costa", "Comissão de Ética Nacional"],
  investigador: ["Paulo Viana", "Investigador · casos designados"],
  admin: ["Bruno Tavares", "Administrador de negócio"],
  tecnico: ["Sérgio Valadares", "Administrador técnico"],
  auditor: ["Lúcia Andrade", "Auditora · Auditoria Interna"],
};

const MENUS: Record<
  RoleKey,
  Array<{ section: string; den?: boolean; items: Array<[string, string, string?]> }>
> = {
  operador: [
    {
      section: "OUVIDORIA",
      items: [
        ["O1", "Triagem", "12"],
        ["O2", "Caixa de entrada", "18"],
        ["O3", "Registrar atendimento"],
        ["O5", "Melhorias"],
      ],
    },
    {
      section: "RELATÓRIOS",
      items: [
        ["F1", "Dashboards"],
        ["F2", "Relatórios"],
        ["F3", "Exportação"],
      ],
    },
    {
      section: "AUDITORIA",
      items: [["G3", "Anexos bloqueados"]],
    },
    {
      section: "AJUDA",
      items: [["H1", "Central de ajuda"]],
    },
  ],
  gestor: [
    {
      section: "OUVIDORIA",
      items: [
        ["O1", "Triagem", "12"],
        ["O2", "Caixa de entrada", "142"],
        ["O5", "Melhorias"],
      ],
    },
    {
      section: "COMUNICAÇÃO",
      items: [["C1", "Campanhas de e-mail"]],
    },
    {
      section: "RELATÓRIOS",
      items: [
        ["F1", "Dashboards"],
        ["F2", "Relatórios"],
        ["F3", "Exportação"],
        ["F4", "Dicionário e BI"],
      ],
    },
    {
      section: "AJUDA",
      items: [["H1", "Central de ajuda"]],
    },
  ],
  interlocutor: [
    {
      section: "RESPOSTA DA ÁREA",
      items: [
        ["R2", "Minhas demandas", "5"],
        ["R1", "Demanda aberta"],
      ],
    },
    {
      section: "AJUDA",
      items: [["H1", "Central de ajuda"]],
    },
  ],
  etica: [
    {
      section: "CANAL DE DENÚNCIAS",
      den: true,
      items: [
        ["D1", "Caixa de denúncias", "4"],
        ["D2", "Caso aberto"],
        ["D3", "Resultado da apuração"],
        ["D4", "Revelação de identidade"],
      ],
    },
    {
      section: "RELATÓRIOS",
      items: [["F1", "Painel de denúncias"]],
    },
    {
      section: "AJUDA",
      items: [["H1", "Central de ajuda"]],
    },
  ],
  investigador: [
    {
      section: "CANAL DE DENÚNCIAS",
      den: true,
      items: [
        ["D1", "Designados a mim", "2"],
        ["D2", "Caso aberto"],
      ],
    },
    {
      section: "AJUDA",
      items: [["H1", "Central de ajuda"]],
    },
  ],
  admin: [
    {
      section: "ADMINISTRAÇÃO",
      items: [
        ["A1", "Organização e filas", "4"],
        ["A2", "Formulários e classificação"],
        ["A3", "Fluxos e prazos"],
        ["A4", "Textos e notificações"],
        ["A5", "Segurança e privacidade"],
        ["A7", "Importação em bloco"],
      ],
    },
    {
      section: "AJUDA",
      items: [["H1", "Central de ajuda"]],
    },
  ],
  tecnico: [
    {
      section: "ADMINISTRAÇÃO TÉCNICA",
      items: [["A6", "Integrações"]],
    },
    {
      section: "AUDITORIA",
      items: [["G2", "Alertas técnicos", "1"]],
    },
    {
      section: "AJUDA",
      items: [["H1", "Central de ajuda"]],
    },
  ],
  auditor: [
    {
      section: "AUDITORIA",
      items: [
        ["G1", "Trilha de auditoria"],
        ["G2", "Alertas de segurança", "3"],
        ["G3", "Anexos bloqueados"],
      ],
    },
    {
      section: "AJUDA",
      items: [["H1", "Central de ajuda"]],
    },
  ],
};

type TriageItem = {
  ch: string;
  channelGroup: string;
  when: string;
  prot: string;
  txt: string;
  nat: string;
  cat: string;
  un: string;
  prev: string;
  den?: boolean;
};

const INITIAL_TRIAGE_ITEMS: TriageItem[] = [
  {
    ch: "Portal",
    channelGroup: "Portal",
    when: "há 8 min",
    prot: "2026-000131",
    txt: "Fiz a inscrição no curso Empretec em Anápolis, paguei e até hoje não recebi a confirmação. Ninguém responde meus e-mails…",
    nat: "Reclamação",
    cat: "Capacitação › Cursos presenciais › Inscrição",
    un: "Sebrae/GO",
    prev: "2 protocolos anteriores deste CPF",
  },
  {
    ch: "WhatsApp · áudio 0:48 (anexo)",
    channelGroup: "WhatsApp",
    when: "há 21 min",
    prot: "2026-000132",
    txt: "Áudio recebido (0:48), sem transcrição nesta fase. Ouça o anexo para classificar.",
    nat: "Elogio",
    cat: "Atendimento › Consultoria › Gestão financeira",
    un: "Sebrae/BA",
    prev: "Primeiro contato",
  },
  {
    ch: "E-mail · ouvidoria@sebrae.com.br",
    channelGroup: "E-mail",
    when: "há 46 min",
    prot: "2026-000133",
    txt: "Assunto: Cobrança indevida feira. Fui cobrado duas vezes pelo estande da Feira do Empreendedor 2026 e preciso do estorno de R$ 1.200,00.",
    nat: "Reclamação",
    cat: "Financeiro › Cobranças › Duplicidade",
    un: "Sebrae/SP",
    prev: "1 protocolo anterior deste CPF",
  },
  {
    ch: "WhatsApp · texto",
    channelGroup: "WhatsApp",
    when: "há 1 h",
    prot: "2026-000134",
    txt: "O analista da agência pediu R$ 500 por fora para aprovar minha participação no programa de crédito orientado.",
    nat: "Escolha…",
    cat: "Escolha…",
    un: "Sebrae/MG",
    prev: "Primeiro contato",
    den: true,
  },
  {
    ch: "Registro manual incompleto · Central 0800",
    channelGroup: "Manual",
    when: "há 2 h",
    prot: "2026-000135",
    txt: "Cliente ligou pedindo a segunda via do certificado do curso de Marketing Digital concluído em julho.",
    nat: "Solicitação",
    cat: "Escolha…",
    un: "Escolha…",
    prev: "Primeiro contato",
  },
];

export function InternalSystem({ goPublic }: { goPublic: (page?: any) => void }) {
  const [role, setRole] = useState<RoleKey>("operador");
  const [screen, setScreen] = useState<string>("O1");
  const [unit, setUnit] = useState("Sebrae/GO");
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState<string | null>(null);
  const [triageFilter, setTriageFilter] = useState("Todos");
  const [triageItems, setTriageItems] = useState<TriageItem[]>(INITIAL_TRIAGE_ITEMS);
  const [inboxView, setInboxView] = useState("Minhas");
  const [archiveType, setArchiveType] = useState<"Spam" | "Duplicada">("Spam");
  const [d2Tab, setD2Tab] = useState<"a" | "e" | "n" | "c" | "h">("a");
  const [d3Conclusion, setD3Conclusion] = useState("Parcialmente procedente");
  const [a1Tab, setA1Tab] = useState<"f" | "e" | "u" | "p" | "t">("f");
  const [a2Tab, setA2Tab] = useState<"c" | "t" | "n" | "m" | "x">("c");
  const [a3Tab, setA3Tab] = useState<"f" | "p" | "c" | "d">("f");
  const [c1Tab, setC1Tab] = useState<"l" | "e" | "s" | "r">("l");
  const [h1Tab, setH1Tab] = useState<"op" | "gest" | "int" | "et">("op");

  const [userName, userTitle] = PEOPLE[role];
  const isDenScreen = ["D1", "D2", "D3", "D4"].includes(screen);

  const handleRoleChange = (nextRole: RoleKey) => {
    setRole(nextRole);
    const firstItem = MENUS[nextRole][0]?.items[0]?.[0];
    if (firstItem) setScreen(firstItem);
  };

  const updateTriageField = (prot: string, field: "nat" | "cat" | "un", value: string) => {
    setTriageItems((prev) =>
      prev.map((item) => (item.prot === prot ? { ...item, [field]: value } : item)),
    );
  };

  const NATS = [
    "Escolha…",
    "Elogio",
    "Reclamação",
    "Solicitação",
    "Sugestão",
    "Consulta ao Código de Ética",
  ];
  const CATS = [
    "Escolha…",
    "Capacitação › Cursos presenciais › Inscrição",
    "Capacitação › Certificado",
    "Atendimento › Consultoria › Gestão financeira",
    "Financeiro › Cobranças › Duplicidade",
    "Conduta › Vantagem indevida",
  ];
  const UNS = ["Escolha…", "Sebrae/GO", "Sebrae/BA", "Sebrae/SP", "Sebrae/MG", "Sebrae Nacional"];

  const filteredTriage =
    triageFilter === "Todos"
      ? triageItems
      : triageItems.filter((i) => i.channelGroup === triageFilter);

  return (
    <div className="internal-layout">
      <aside className="internal-sidebar" aria-label="Menu do perfil">
        <div className="internal-brand-wrap">
          <button type="button" className="internal-logo-box" onClick={() => goPublic("home")}>
            LOGO DA EMPRESA
          </button>
          <p className="internal-brand-sub">Ouvidoria e Canal de Denúncias</p>
        </div>

        <nav className="internal-nav" aria-label="Menu principal interno">
          {MENUS[role].map((group) => (
            <div className="internal-nav-group" key={group.section}>
              <span className="internal-nav-section">{group.section}</span>
              {group.items.map(([id, label, badge]) => (
                <button
                  key={id + label}
                  type="button"
                  className={`internal-nav-item ${screen === id ? "active" : ""} ${group.den ? "den-item" : ""}`}
                  onClick={() => setScreen(id)}
                >
                  <span className="internal-item-label">
                    <small className="internal-item-code">{id}</small>
                    <span>{label}</span>
                  </span>
                  {badge !== undefined && <span className="internal-nav-badge">{badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="internal-sidebar-footer">
          <p>
            Ver como: <b>{userName}</b>
          </p>
          <span>{userTitle}</span>
          <select
            className="internal-role-select"
            value={role}
            aria-label="Alternar perfil de visualização"
            onChange={(e) => handleRoleChange(e.target.value as RoleKey)}
          >
            {ROLES.map(([k, l]) => (
              <option key={k} value={k}>
                Perfil: {l}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="internal-portal-switch"
            onClick={() => goPublic("home")}
          >
            ← Voltar ao Portal Público
          </button>
        </div>
      </aside>

      <div className="internal-main-area">
        <header className="internal-topbar">
          <div className="internal-topbar-left">
            <label className="internal-unit-label">
              <span>Unidade</span>
              <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                <option>Todas as unidades (Nacional)</option>
                <option>Sebrae Nacional</option>
                <option>Sebrae/GO</option>
                <option>Sebrae/BA</option>
                <option>Sebrae/SP</option>
              </select>
            </label>
            <div className="internal-search-box">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar protocolo (ex.: 2026-000123)"
              />
            </div>
            <button
              type="button"
              className="internal-icon-btn"
              title="Notificações"
              aria-label="5 notificações não lidas"
              onClick={() => setModal("notif")}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              <span className="notif-badge">5</span>
            </button>
            <button
              type="button"
              className="internal-icon-btn"
              title="Ajuda desta tela"
              aria-label="Ajuda desta tela"
              onClick={() => setScreen("H1")}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </button>
          </div>

          <div className="internal-user-info">
            <strong>{userName}</strong>
            <span>{userTitle}</span>
          </div>
        </header>

        {isDenScreen && (
          <div className="internal-den-strip">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <strong>Área sigilosa — acesso registrado</strong>
            <span>· Cada visualização entra na trilha de auditoria · MFA ativo</span>
          </div>
        )}

        <main className="internal-workspace">
          {/* ================= O1: TRIAGEM ================= */}
          {screen === "O1" && (
            <div className="int-page">
              <div className="int-page-head">
                <div>
                  <div className="int-crumb">
                    <code>O1</code> Ouvidoria
                  </div>
                  <h1>Triagem</h1>
                  <p className="int-sub">
                    Tudo o que acabou de chegar, de todos os canais. Leia o relato e confirme
                    natureza, categoria e unidade.
                  </p>
                </div>
                <div className="button-row">
                  <button className="button secondary compact" onClick={() => setScreen("O3")}>
                    Registrar atendimento
                  </button>
                  <button className="button primary compact" onClick={() => setScreen("O2")}>
                    Ir para a caixa de entrada
                  </button>
                </div>
              </div>

              <div className="int-toolbar">
                <div className="int-chips">
                  {[
                    ["Todos", 12],
                    ["Portal", 5],
                    ["WhatsApp", 4],
                    ["E-mail", 2],
                    ["Manual", 1],
                  ].map(([label, count]) => (
                    <button
                      key={label}
                      type="button"
                      className={triageFilter === label ? "int-chip active" : "int-chip"}
                      onClick={() => setTriageFilter(String(label))}
                    >
                      {label} <span>{count}</span>
                    </button>
                  ))}
                </div>
                <span className="field-hint">
                  Classificação feita pelo operador · sem IA nesta fase{" "}
                  <span className="int-test-badge">T5</span>
                </span>
              </div>

              <div className="info">
                <img src="/assets/info.svg" alt="" />
                <span>
                  3 respostas de manifestantes chegaram por e-mail hoje e foram anexadas
                  automaticamente aos protocolos existentes.
                </span>
              </div>

              <div className="triage-list">
                {filteredTriage.map((item) => {
                  const ok =
                    item.nat !== "Escolha…" &&
                    item.cat !== "Escolha…" &&
                    item.un !== "Escolha…";
                  return (
                    <article className="int-card triage-card" key={item.prot}>
                      <div className="triage-left">
                        <div className="triage-meta">
                          <span className="int-badge green">{item.ch}</span>
                          <strong className="protocol-number">{item.prot}</strong>
                          <span className="field-hint">{item.when}</span>
                        </div>
                        <blockquote className="int-quote">{item.txt}</blockquote>
                        <span className="field-hint">{item.prev}</span>
                        <div className="triage-actions">
                          <button
                            type="button"
                            className="button primary compact"
                            disabled={!ok}
                            style={!ok ? { opacity: 0.45, cursor: "not-allowed" } : undefined}
                            title={
                              !ok ? "Preencha natureza, categoria e unidade" : "Confirmar triagem"
                            }
                            onClick={() => ok && setScreen("O2")}
                          >
                            Confirmar triagem
                          </button>
                          <button
                            type="button"
                            className="button secondary compact"
                            onClick={() => setModal("categoria")}
                          >
                            Buscar categoria
                          </button>
                          <button
                            type="button"
                            className={`button ${item.den ? "red" : "secondary"} compact`}
                            onClick={() => setModal("converter")}
                          >
                            Converter em denúncia
                          </button>
                          <button
                            type="button"
                            className="int-ghost-btn"
                            onClick={() => setModal("arquivar")}
                          >
                            Arquivar (spam ou duplicada)
                          </button>
                          <button
                            type="button"
                            className="int-ghost-btn"
                            onClick={() => setModal("juntar")}
                          >
                            Juntar a protocolo
                          </button>
                        </div>
                      </div>

                      <div className="triage-classify-box">
                        <span className="classify-eyebrow">CLASSIFICAÇÃO</span>
                        <label>
                          Natureza <span className="req-star">*</span>
                          <select
                            value={item.nat}
                            onChange={(e) => updateTriageField(item.prot, "nat", e.target.value)}
                          >
                            {NATS.map((o) => (
                              <option key={o}>{o}</option>
                            ))}
                          </select>
                        </label>
                        <label>
                          Categoria <span className="req-star">*</span>
                          <select
                            value={item.cat}
                            onChange={(e) => updateTriageField(item.prot, "cat", e.target.value)}
                          >
                            {CATS.map((o) => (
                              <option key={o}>{o}</option>
                            ))}
                          </select>
                        </label>
                        <label>
                          Unidade <span className="req-star">*</span>
                          <select
                            value={item.un}
                            onChange={(e) => updateTriageField(item.prot, "un", e.target.value)}
                          >
                            {UNS.map((o) => (
                              <option key={o}>{o}</option>
                            ))}
                          </select>
                        </label>
                        {!ok && (
                          <span className="triage-error">
                            Confirmar fica bloqueado até natureza, categoria e unidade estarem
                            preenchidas.
                          </span>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= O2: CAIXA DE ENTRADA ================= */}
          {screen === "O2" && (
            <div className="int-page">
              <div className="int-page-head">
                <div>
                  <div className="int-crumb">
                    <code>O2</code> Ouvidoria
                  </div>
                  <h1>Caixa de entrada</h1>
                  <p className="int-sub">
                    {unit} · você vê só os registros permitidos para o seu perfil e a sua unidade.
                  </p>
                </div>
                <div className="button-row">
                  <button className="button secondary compact" onClick={() => setScreen("O1")}>
                    Triagem (12)
                  </button>
                  <button className="button primary compact" onClick={() => setScreen("O3")}>
                    Registrar atendimento
                  </button>
                </div>
              </div>

              <div className="int-views-row">
                {[
                  ["18", "Minhas", ""],
                  ["7", "Vencendo em 3 dias", "warn"],
                  ["3", "Vencidas", "bad"],
                  ["11", "Aguardando área", ""],
                  ["4", "Aguardando manifestante", ""],
                  ["5", "Minuta recebida", ""],
                  ["142", "Todas da unidade", ""],
                ].map(([num, label, tone]) => (
                  <button
                    key={label}
                    type="button"
                    className={`int-view-card ${inboxView === label ? "active" : ""} ${tone}`}
                    onClick={() => setInboxView(label)}
                  >
                    <b>{num}</b>
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              <section className="int-card">
                <div className="int-filters-grid">
                  <label>
                    Detalhes da manifestação
                    <input placeholder="Texto livre no relato" />
                  </label>
                  <label>
                    Protocolo
                    <input placeholder="2026-…" />
                  </label>
                  <label>
                    Período de cadastro
                    <input defaultValue="01/10/2026 – 03/11/2026" />
                  </label>
                  <label>
                    Período de conclusão
                    <input placeholder="dd/mm/aaaa – dd/mm/aaaa" />
                  </label>
                  <label>
                    UF de tratamento
                    <select defaultValue="GO">
                      <option>Todas</option>
                      <option>GO</option>
                      <option>BA</option>
                      <option>SP</option>
                      <option>MG</option>
                      <option>DF</option>
                    </select>
                  </label>
                  <label>
                    Situação
                    <select defaultValue="Em aberto">
                      <option>Em aberto</option>
                      <option>Em tratamento</option>
                      <option>Aguardando área</option>
                      <option>Minuta recebida</option>
                      <option>Aguardando manifestante</option>
                      <option>Encerrada</option>
                      <option>Arquivada</option>
                    </select>
                  </label>
                </div>
                <div className="int-toolbar" style={{ marginTop: "14px" }}>
                  <a>+ Natureza, categoria, canal, responsável, anônimo/identificado</a>
                  <div className="button-row" style={{ alignItems: "center" }}>
                    <span className="int-test-badge">T34</span>
                    <button className="button secondary compact">Limpar</button>
                    <button className="button primary compact">Filtrar</button>
                  </div>
                </div>
              </section>

              <div className="int-toolbar">
                <span className="field-hint">2 selecionados</span>
                <div className="button-row">
                  <button className="button secondary compact">Atribuir responsável</button>
                  <button className="button secondary compact" onClick={() => setScreen("F3")}>
                    Exportar seleção
                  </button>
                </div>
              </div>

              <div className="int-table-wrap">
                <table className="int-table">
                  <thead>
                    <tr>
                      <th>
                        <input type="checkbox" aria-label="Selecionar todos" />
                      </th>
                      <th>PRAZO</th>
                      <th>PROTOCOLO</th>
                      <th>NATUREZA</th>
                      <th>CATEGORIA</th>
                      <th>CANAL</th>
                      <th>MANIFESTANTE</th>
                      <th>SITUAÇÃO</th>
                      <th>RESPONSÁVEL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [
                        "r",
                        "Vencida há 1 dia",
                        "2026-000098",
                        "Reclamação",
                        "Financeiro › Cobranças",
                        "E-mail",
                        "João Pedro Alves",
                        "Aguardando área",
                        "Ana Paula",
                      ],
                      [
                        "g",
                        "17 dias",
                        "2026-000123",
                        "Reclamação",
                        "Capacitação › Inscrição",
                        "Portal",
                        "Carla Mendes de Souza",
                        "Minuta recebida",
                        "Ana Paula",
                      ],
                      [
                        "y",
                        "3 dias úteis",
                        "2026-000117",
                        "Solicitação",
                        "Atendimento › 2ª via",
                        "WhatsApp",
                        "Anônimo",
                        "Aguardando manifestante",
                        "Ana Paula",
                      ],
                      [
                        "g",
                        "8 dias úteis",
                        "2026-000126",
                        "Sugestão",
                        "Eventos › Programação",
                        "Portal",
                        "Renata Lopes",
                        "Em tratamento",
                        "Diego Martins",
                      ],
                      [
                        "g",
                        "9 dias úteis",
                        "2026-000128",
                        "Reclamação",
                        "Consultoria › Agendamento",
                        "Telefone 0800",
                        "Marcelo Vieira",
                        "Aguardando área",
                        "Ana Paula",
                      ],
                      [
                        "g",
                        "11 dias úteis",
                        "2026-000129",
                        "Elogio",
                        "Atendimento › Presencial",
                        "Presencial",
                        "Sônia Ramos",
                        "Em tratamento",
                        "Diego Martins",
                      ],
                      [
                        "g",
                        "12 dias úteis",
                        "2026-000130",
                        "Consulta ao Código de Ética",
                        "Conduta › Brindes",
                        "Portal",
                        "Felipe Andrade",
                        "Em tratamento",
                        "Ana Paula",
                      ],
                      [
                        "g",
                        "14 dias úteis",
                        "2026-000131",
                        "Reclamação",
                        "Capacitação › Inscrição",
                        "Portal",
                        "Lívia Castro",
                        "Em tratamento",
                        "—",
                      ],
                    ].map((r, idx) => (
                      <tr key={r[2]} className="clickable-row" onClick={() => setScreen("O4")}>
                        <td onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" defaultChecked={idx < 2} />
                        </td>
                        <td>
                          <span className={`int-sem ${r[0]}`}>
                            <i />
                            {r[1]}
                          </span>
                        </td>
                        <td className="protocol-number">{r[2]}</td>
                        <td>{r[3]}</td>
                        <td>{r[4]}</td>
                        <td>{r[5]}</td>
                        <td>{r[6]}</td>
                        <td>
                          <span className={`int-badge ${r[7] === "Minuta recebida" ? "green" : ""}`}>
                            {r[7]}
                          </span>
                        </td>
                        <td>{r[8]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= O3: REGISTRAR ATENDIMENTO ================= */}
          {screen === "O3" && (
            <div className="int-page">
              <div className="int-page-head">
                <div>
                  <div className="int-crumb">
                    <code>O3</code> Ouvidoria
                  </div>
                  <h1>Registrar atendimento</h1>
                  <p className="int-sub">
                    Para manifestações recebidas por telefone, presencialmente, pela Central
                    Nacional ou pelo Reclame Aqui.
                  </p>
                </div>
              </div>
              <div className="int-grid-aside">
                <section className="int-card" style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div className="two-cols">
                    <label>
                      Canal de entrada <span className="req-star">*</span>
                      <select defaultValue="Telefone · Central de Relacionamento 0800">
                        <option>Telefone · Central de Relacionamento 0800</option>
                        <option>Presencial</option>
                        <option>Central Nacional</option>
                        <option>Reclame Aqui</option>
                        <option>Carta</option>
                        <option>Redes sociais</option>
                      </select>
                    </label>
                    <label>
                      Data original do recebimento <span className="req-star">*</span>
                      <input defaultValue="03/11/2026 09:12" />
                    </label>
                    <label>
                      Natureza <span className="req-star">*</span>
                      <select defaultValue="Reclamação">
                        <option>Elogio</option>
                        <option>Reclamação</option>
                        <option>Solicitação</option>
                        <option>Sugestão</option>
                        <option>Consulta ao Código de Ética</option>
                      </select>
                    </label>
                    <label>
                      Categoria
                      <select defaultValue="Consultoria › Agendamento">
                        <option>Consultoria › Agendamento</option>
                        <option>Capacitação › Inscrição</option>
                        <option>Financeiro › Cobranças</option>
                      </select>
                    </label>
                  </div>
                  <hr className="int-hr" />
                  <div className="two-cols">
                    <label>
                      CPF do manifestante
                      <input defaultValue="315.207.664-08" />
                    </label>
                    <label>
                      Nome
                      <input defaultValue="Marcelo Vieira dos Santos" />
                    </label>
                    <label>
                      E-mail
                      <input defaultValue="marcelo.vieira@outlook.com" />
                    </label>
                    <label>
                      Telefone
                      <input defaultValue="(62) 98144-3019" />
                    </label>
                  </div>
                  <div className="complaint-notice" style={{ marginTop: 0 }}>
                    <span>
                      <b>Este CPF já tem 2 protocolos:</b>
                      <br />
                      <a onClick={() => setScreen("O4")}>2026-000128</a> · Reclamação · Consultoria ›
                      Agendamento · <b>em aberto</b>
                      <br />
                      <span className="protocol-number">2025-004812</span> · Solicitação · encerrada
                      em 14/03/2025
                    </span>
                  </div>
                  <label>
                    Relato <span className="req-star">*</span>
                    <textarea
                      rows={5}
                      defaultValue="O cliente informa que agendou consultoria de precificação para 28/10 e o consultor não compareceu. Remarcou para 31/10 e novamente não houve atendimento. Pede um novo horário ainda nesta semana."
                    />
                  </label>
                  <label className="retaliation-check">
                    <input type="checkbox" />
                    <span>Manifestante pediu anonimato</span>
                  </label>
                  <label className="retaliation-check">
                    <input type="checkbox" defaultChecked />
                    <span>Manifestante autorizou contato (LGPD)</span>
                  </label>
                </section>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <section className="int-card">
                    <h3>Gravado automaticamente</h3>
                    <dl className="privacy-dl" style={{ gridTemplateColumns: "110px 1fr", marginTop: "12px" }}>
                      <dt>Operador</dt>
                      <dd>
                        <b>{userName}</b>
                      </dd>
                      <dt>Unidade</dt>
                      <dd>
                        <b>{unit}</b>
                      </dd>
                      <dt>Canal</dt>
                      <dd>
                        <b>Telefone · 0800</b>
                      </dd>
                      <dt>Registro</dt>
                      <dd>
                        <b>03/11/2026 09:26</b>
                      </dd>
                    </dl>
                  </section>
                  <section className="int-card">
                    <h3>Anexos</h3>
                    <div className="complaint-dropzone" style={{ marginTop: "12px" }}>
                      <p>Arraste a gravação da ligação ou documentos</p>
                    </div>
                  </section>
                </div>
              </div>
              <div className="form-actions">
                <button className="button secondary" onClick={() => setScreen("O2")}>
                  Cancelar
                </button>
                <button className="button primary" onClick={() => setScreen("O4")}>
                  Registrar e abrir tratamento
                </button>
              </div>
            </div>
          )}

          {/* ================= O4: TRATAMENTO DA MANIFESTAÇÃO ================= */}
          {screen === "O4" && (
            <div className="int-page">
              <div className="int-page-head">
                <div>
                  <div className="int-crumb">
                    <code>O4</code> Ouvidoria
                  </div>
                  <h1 className="protocol-number">2026-000123</h1>
                  <p className="int-sub">
                    Reclamação · Capacitação › Cursos presenciais › Inscrição · Sebrae/GO
                  </p>
                </div>
                <div className="button-row" style={{ alignItems: "center" }}>
                  <span className="int-sem g">
                    <i /> 17 dias · vence 20/11/2026
                  </span>
                  <span className="int-badge green">Minuta recebida</span>
                  <button className="button secondary compact" onClick={() => setScreen("O2")}>
                    Voltar à caixa
                  </button>
                </div>
              </div>

              <div className="int-o4-grid">
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <section className="int-card">
                    <div className="int-toolbar" style={{ marginBottom: "12px" }}>
                      <h3 style={{ margin: 0 }}>O caso</h3>
                      <a>Editar classificação</a>
                    </div>
                    <dl className="privacy-dl" style={{ gridTemplateColumns: "110px 1fr", gap: "8px 12px" }}>
                      <dt>Manifestante</dt>
                      <dd>Carla Mendes de Souza</dd>
                      <dt>CPF</dt>
                      <dd>048.•••.•••-30</dd>
                      <dt>E-mail</dt>
                      <dd>carla.mendes@gmail.com</dd>
                      <dt>UF</dt>
                      <dd>GO</dd>
                      <dt>Natureza</dt>
                      <dd>Reclamação</dd>
                      <dt>Categoria</dt>
                      <dd>Capacitação › Cursos presenciais › Inscrição</dd>
                      <dt>Canal</dt>
                      <dd>Portal</dd>
                      <dt>Unidade</dt>
                      <dd>Sebrae/GO</dd>
                      <dt>Recebida</dt>
                      <dd>21/10/2026 14:32</dd>
                      <dt>Status</dt>
                      <dd>
                        <b>Minuta recebida</b>
                      </dd>
                    </dl>
                  </section>

                  <section className="int-card">
                    <h3>Relato original</h3>
                    <p style={{ marginTop: "8px" }}>
                      Fiz a inscrição no curso presencial Empretec de Goiânia no dia 02/10, paguei o
                      boleto no mesmo dia e até agora não recebi a confirmação da vaga. Liguei duas
                      vezes para a Central e me disseram que a turma está cheia, mas o valor ainda
                      não foi devolvido. Quero a confirmação da vaga ou o reembolso.
                    </p>
                  </section>

                  <section className="int-card">
                    <div className="int-toolbar" style={{ marginBottom: "10px" }}>
                      <h3 style={{ margin: 0 }}>Anexos</h3>
                      <button className="button secondary compact">+ Incluir</button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13.5px" }}>
                      <div className="int-toolbar">
                        <span>comprovante_pagamento.pdf</span>
                        <a>Excluir</a>
                      </div>
                      <div className="int-toolbar">
                        <span>print_email_inscricao.png</span>
                        <a>Excluir</a>
                      </div>
                      <div className="int-toolbar">
                        <span>audio_ligacao_central.mp3</span>
                        <a>Excluir</a>
                      </div>
                    </div>
                  </section>
                </div>

                <section className="int-card">
                  <div className="int-toolbar" style={{ marginBottom: "14px" }}>
                    <h3 style={{ margin: 0 }}>Linha do tempo</h3>
                    <div className="int-chips">
                      <button type="button" className="int-chip active">
                        Tudo
                      </button>
                      <button type="button" className="int-chip">
                        Só comunicação
                      </button>
                    </div>
                  </div>
                  <ul className="int-events-list">
                    <li>
                      <span className="when">03/11 08:40</span>
                      <div>
                        <b>Minuta devolvida pela área</b>
                        <p className="field-hint">Rafael Lima · Unidade de Capacitação GO</p>
                        <blockquote className="int-quote" style={{ marginTop: "6px" }}>
                          “Confirmamos a vaga da manifestante na turma de 18 a 23/11. O pagamento
                          foi localizado…”
                        </blockquote>
                      </div>
                    </li>
                    <li>
                      <span className="when">30/10 16:15</span>
                      <div>
                        <b>Pedido de complemento enviado</b>
                        <p className="field-hint">Prazo para resposta: 10/11/2026</p>
                      </div>
                    </li>
                    <li>
                      <span className="when">24/10 11:30</span>
                      <div>
                        <b>Encaminhada para Unidade de Capacitação GO</b>
                        <p className="field-hint">Interlocutor Rafael Lima · prazo 31/10</p>
                      </div>
                    </li>
                    <li>
                      <span className="when">21/10 15:10</span>
                      <div>
                        <b>Triagem confirmada</b>
                        <p className="field-hint">
                          Classificada por Ana Paula Ribeiro · prazo: 20/11/2026
                        </p>
                      </div>
                    </li>
                    <li>
                      <span className="when">21/10 14:32</span>
                      <div>
                        <b>Registrada pelo portal</b>
                        <p className="field-hint">E-mail automático de abertura enviado</p>
                      </div>
                    </li>
                  </ul>
                </section>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div className="int-next-step">
                    <small>PRÓXIMO PASSO</small>
                    <b>Revisar a minuta da área e enviar a resposta final</b>
                  </div>
                  <section className="int-card">
                    <h3>Pendências desta etapa</h3>
                    <ul className="check-list" style={{ marginTop: "10px", marginBottom: 0 }}>
                      <li>✓ Classificação confirmada</li>
                      <li>✓ Resposta da área recebida</li>
                      <li>○ Revisar e aprovar a minuta</li>
                    </ul>
                  </section>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <button className="button primary full" onClick={() => setModal("minuta")}>
                      Revisar minuta e encerrar
                    </button>
                    <button className="button secondary full" onClick={() => setModal("encaminhar")}>
                      Encaminhar para área
                    </button>
                    <button className="button secondary full" onClick={() => setModal("complemento")}>
                      Pedir complemento
                    </button>
                    <button className="button secondary full" onClick={() => setScreen("O5")}>
                      Marcar melhoria
                    </button>
                    <button className="button red full" onClick={() => setModal("converter")}>
                      Converter em denúncia
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= O5: MELHORIAS E PLANOS DE AÇÃO ================= */}
          {screen === "O5" && (
            <div className="int-page">
              <div className="int-page-head">
                <div>
                  <div className="int-crumb">
                    <code>O5</code> Ouvidoria
                  </div>
                  <h1>Melhorias e planos de ação</h1>
                  <p className="int-sub">
                    Manifestações que geraram melhoria e os planos que respondem a elas. Alimenta o
                    Relatório de Melhorias anual.
                  </p>
                </div>
                <div className="button-row">
                  <button className="button secondary compact" onClick={() => setScreen("F2")}>
                    Relatório de Melhorias 2026
                  </button>
                  <button className="button primary compact">Novo plano de ação</button>
                </div>
              </div>

              <div className="how-grid">
                {[
                  [
                    "Confirmar inscrição em até 48 h",
                    "Em andamento",
                    "Estruturante · Capacitação",
                    "Juliana Prado · Capacitação GO",
                    "15/12/2026",
                    "14 vinculadas",
                    "60%",
                  ],
                  [
                    "Roteiro da Central para turmas lotadas",
                    "Concluído",
                    "Pontual · Atendimento",
                    "Central de Relacionamento",
                    "30/10/2026",
                    "6 vinculadas",
                    "100%",
                  ],
                  [
                    "Estorno automático em cobrança dupla",
                    "Não iniciado",
                    "Estruturante · Financeiro",
                    "Unidade Financeira Nacional",
                    "31/03/2027",
                    "9 vinculadas",
                    "0%",
                  ],
                ].map(([title, status, kind, resp, deadline, count, pct]) => (
                  <section className="int-card" key={title}>
                    <div className="int-toolbar" style={{ marginBottom: "8px" }}>
                      <strong style={{ fontSize: "16px" }}>{title}</strong>
                      <span className="int-badge green">{status}</span>
                    </div>
                    <p className="field-hint" style={{ marginBottom: "10px" }}>
                      {kind}
                    </p>
                    <dl className="privacy-dl" style={{ gridTemplateColumns: "100px 1fr", gap: "6px 10px" }}>
                      <dt>Responsável</dt>
                      <dd>{resp}</dd>
                      <dt>Prazo</dt>
                      <dd>{deadline}</dd>
                      <dt>Manifestações</dt>
                      <dd>{count}</dd>
                    </dl>
                    <div className="int-toolbar" style={{ marginTop: "12px", fontSize: "12.5px" }}>
                      <span>Progresso</span>
                      <b>{pct}</b>
                    </div>
                    <div className="int-progress-bar">
                      <div style={{ width: pct }} />
                    </div>
                  </section>
                ))}
              </div>

              <h3 style={{ marginTop: "8px" }}>Manifestações marcadas como “gerou melhoria”</h3>
              <div className="int-table-wrap">
                <table className="int-table">
                  <thead>
                    <tr>
                      <th>PROTOCOLO</th>
                      <th>TIPO</th>
                      <th>TEMA</th>
                      <th>UNIDADE</th>
                      <th>PLANO DE AÇÃO</th>
                      <th>MARCADA EM</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="clickable-row" onClick={() => setScreen("O4")}>
                      <td className="protocol-number">2026-000123</td>
                      <td>Estruturante</td>
                      <td>Confirmação de inscrição</td>
                      <td>Sebrae/GO</td>
                      <td>Confirmar inscrição em até 48 h</td>
                      <td>03/11/2026</td>
                    </tr>
                    <tr>
                      <td className="protocol-number">2026-000087</td>
                      <td>Estruturante</td>
                      <td>Confirmação de inscrição</td>
                      <td>Sebrae/GO</td>
                      <td>Confirmar inscrição em até 48 h</td>
                      <td>20/10/2026</td>
                    </tr>
                    <tr>
                      <td className="protocol-number">2026-000064</td>
                      <td>Pontual</td>
                      <td>Turma lotada</td>
                      <td>Sebrae/GO</td>
                      <td>Roteiro da Central para turmas lotadas</td>
                      <td>08/10/2026</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= R1 & R2: RESPOSTA DA ÁREA ================= */}
          {screen === "R1" && (
            <div className="int-page">
              <div className="int-page-head">
                <div>
                  <div className="int-crumb">
                    <code>R1</code> Resposta da área
                  </div>
                  <h1 className="protocol-number">2026-000123</h1>
                  <p className="int-sub">Reclamação · Capacitação › Cursos presenciais › Inscrição</p>
                </div>
                <span className="int-sem y">
                  <i /> Responder até 31/10/2026 · 1 dia útil
                </span>
              </div>
              <div className="two-cols">
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <section className="int-card">
                    <h3>Orientação da Ouvidoria</h3>
                    <p style={{ marginTop: "8px" }}>
                      Rafael, confirme se o pagamento da Carla foi localizado e se há vaga na turma
                      de novembro. Se não houver, informe o prazo de reembolso.
                    </p>
                    <p className="field-hint">Ana Paula Ribeiro · 24/10/2026</p>
                  </section>
                  <section className="int-card">
                    <h3>Relato</h3>
                    <p style={{ marginTop: "8px" }}>
                      Fiz a inscrição no curso presencial Empretec de Goiânia no dia 02/10, paguei o
                      boleto no mesmo dia e até agora não recebi a confirmação da vaga…
                    </p>
                  </section>
                </div>
                <section className="int-card" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <h3>Minuta de resposta</h3>
                  <textarea
                    rows={6}
                    defaultValue="Confirmamos a vaga da manifestante na turma Empretec de 18 a 23/11. O pagamento foi localizado: o boleto foi compensado em 03/10 na conta do convênio e já foi conciliado. A confirmação foi reenviada para carla.mendes@gmail.com hoje."
                  />
                  <div className="button-row" style={{ justifyContent: "flex-end" }}>
                    <button className="button secondary compact">Não é da minha área</button>
                    <button className="button secondary compact">Pedir prorrogação</button>
                    <button className="button primary compact" onClick={() => setScreen("O4")}>
                      Devolver à Ouvidoria
                    </button>
                  </div>
                </section>
              </div>
            </div>
          )}

          {screen === "R2" && (
            <div className="int-page">
              <div className="int-page-head">
                <div>
                  <div className="int-crumb">
                    <code>R2</code> Resposta da área
                  </div>
                  <h1>Minhas demandas</h1>
                  <p className="int-sub">
                    O que foi encaminhado a você ou à Unidade de Capacitação GO.
                  </p>
                </div>
              </div>
              <div className="int-table-wrap">
                <table className="int-table">
                  <thead>
                    <tr>
                      <th>PRAZO</th>
                      <th>PROTOCOLO</th>
                      <th>ASSUNTO</th>
                      <th>ENCAMINHADA POR</th>
                      <th>SITUAÇÃO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="clickable-row" onClick={() => setScreen("R1")}>
                      <td>
                        <span className="int-sem y">
                          <i /> 1 dia útil · 31/10
                        </span>
                      </td>
                      <td className="protocol-number">2026-000123</td>
                      <td>Confirmação de vaga Empretec</td>
                      <td>Ana Paula Ribeiro</td>
                      <td>
                        <span className="int-badge green">Rascunho salvo</span>
                      </td>
                    </tr>
                    <tr className="clickable-row" onClick={() => setScreen("R1")}>
                      <td>
                        <span className="int-sem r">
                          <i /> Vencida · 30/10
                        </span>
                      </td>
                      <td className="protocol-number">2026-000098</td>
                      <td>Reembolso de curso cancelado</td>
                      <td>Ana Paula Ribeiro</td>
                      <td>
                        <span className="int-badge red">Sem resposta</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= D1..D4: CANAL DE DENÚNCIAS INTERNO ================= */}
          {screen === "D1" && (
            <div className="int-page">
              <div className="int-page-head">
                <div>
                  <div className="int-crumb">
                    <code>D1</code> Canal de Denúncias
                  </div>
                  <h1 style={{ color: "var(--red)" }}>Caixa de denúncias</h1>
                  <p className="int-sub">
                    Comissão de Ética Nacional · distribuição pelo fluxograma, pela natureza e pelo
                    nível mais alto informado.
                  </p>
                </div>
              </div>
              <div className="int-views-row">
                {[
                  ["4", "Novas"],
                  ["9", "Em apuração"],
                  ["2", "Prazo vencendo"],
                  ["3", "Críticas"],
                  ["61", "Encerradas"],
                ].map(([n, l], idx) => (
                  <button
                    key={l}
                    type="button"
                    className={`int-view-card ${idx === 0 ? "active" : ""}`}
                  >
                    <b>{n}</b>
                    <span>{l}</span>
                  </button>
                ))}
              </div>
              <div className="complaint-notice" style={{ marginTop: 0 }}>
                <span>
                  Casos em que você tem conflito de interesse não aparecem nesta lista, na busca,
                  nos contadores nem nos relatórios.
                </span>
              </div>
              <div className="int-table-wrap">
                <table className="int-table">
                  <thead>
                    <tr>
                      <th>PRAZO DE APURAÇÃO</th>
                      <th>PROTOCOLO</th>
                      <th>CRITICIDADE</th>
                      <th>TEMA</th>
                      <th>UNIDADE</th>
                      <th>RECEBIDA</th>
                      <th>RESPONSÁVEL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="clickable-row" onClick={() => setScreen("D2")}>
                      <td>
                        <span className="int-sem g">
                          <i /> 60 dias · 02/01/2027
                        </span>
                      </td>
                      <td className="protocol-number">2026-000140</td>
                      <td>
                        <span className="int-badge red">Alta</span>
                      </td>
                      <td>Licitações e contratos</td>
                      <td>Sebrae/BA</td>
                      <td>03/11/2026</td>
                      <td>Helena Costa</td>
                    </tr>
                    <tr className="clickable-row" onClick={() => setScreen("D4")}>
                      <td>
                        <span className="int-sem y">
                          <i /> 5 dias · 08/11/2026
                        </span>
                      </td>
                      <td className="protocol-number">2026-000091</td>
                      <td>
                        <span className="int-badge">Média</span>
                      </td>
                      <td>Assédio moral</td>
                      <td>Sebrae/MG</td>
                      <td>02/09/2026</td>
                      <td>Helena Costa</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {screen === "D2" && (
            <div className="int-page">
              <div className="int-page-head">
                <div>
                  <div className="int-crumb">
                    <code>D2</code> Canal de Denúncias
                  </div>
                  <h1 className="protocol-number" style={{ color: "var(--red)" }}>
                    2026-000140
                  </h1>
                  <p className="int-sub">
                    Licitações, contratos e parcerias · Sebrae/BA · anônima
                  </p>
                </div>
                <div className="button-row">
                  <button className="button red compact" onClick={() => setScreen("D3")}>
                    Registrar resultado da apuração
                  </button>
                  <button className="button secondary compact" onClick={() => setScreen("D1")}>
                    Voltar à caixa
                  </button>
                </div>
              </div>
              <section className="int-card">
                <strong style={{ color: "var(--red)" }}>
                  Relato original · não pode ser editado
                </strong>
                <p style={{ marginTop: "8px" }}>
                  Desde agosto, as cotações para eventos do Sebrae/BA chegam sempre com as mesmas
                  três empresas e a Alfa Eventos vence todas. Vi mensagens em que o coordenador pede
                  à Alfa para mandar as outras duas propostas com valores maiores.
                </p>
              </section>
              <div className="privacy-tabs">
                {[
                  ["a", "Análise"],
                  ["e", "Evidências (3)"],
                  ["n", "Notas investigativas (2)"],
                  ["c", "Comunicação"],
                  ["h", "Histórico"],
                ].map(([k, l]) => (
                  <button
                    key={k}
                    type="button"
                    className={d2Tab === k ? "active denuncias-tab" : "denuncias-tab"}
                    onClick={() => setD2Tab(k as any)}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <section className="int-card">
                {d2Tab === "a" && (
                  <div className="two-cols">
                    <div>
                      <h3>Classificação e risco</h3>
                      <dl className="privacy-dl" style={{ gridTemplateColumns: "140px 1fr", marginTop: "10px" }}>
                        <dt>Tema</dt>
                        <dd>Licitações, contratos e parcerias</dd>
                        <dt>Prioridade</dt>
                        <dd>
                          <b>Alta (Nota 78)</b>
                        </dd>
                        <dt>Status</dt>
                        <dd>Em apuração</dd>
                      </dl>
                    </div>
                    <div>
                      <h3>Pessoas envolvidas</h3>
                      <p className="field-hint" style={{ marginTop: "8px" }}>
                        Marcos A. Ferreira (Gerência · Sebrae/BA — vinculado e bloqueado de ver o
                        caso) · Alfa Eventos Ltda. (Terceiro)
                      </p>
                    </div>
                  </div>
                )}
                {d2Tab !== "a" && (
                  <p>
                    Conteúdo da aba selecionada com cadeia de custódia SHA-256 e sigilo restrito à
                    Comissão de Ética.
                  </p>
                )}
              </section>
            </div>
          )}

          {screen === "D3" && (
            <div className="int-page">
              <div className="int-page-head">
                <div>
                  <div className="int-crumb">
                    <code>D3</code> Canal de Denúncias
                  </div>
                  <h1 style={{ color: "var(--red)" }}>Resultado da apuração · 2026-000140</h1>
                  <p className="int-sub">
                    A conclusão e as penalidades ficam ligadas à denúncia e alimentam o banco de
                    envolvidos.
                  </p>
                </div>
                <button className="button secondary compact" onClick={() => setScreen("D2")}>
                  Voltar ao caso
                </button>
              </div>
              <div className="two-cols">
                <section className="int-card" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <h3>Conclusão</h3>
                  <div className="privacy-type-grid">
                    {["Procedente", "Parcialmente procedente", "Improcedente"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className={d3Conclusion === opt ? "selected" : ""}
                        onClick={() => setD3Conclusion(opt)}
                      >
                        <strong>{opt}</strong>
                      </button>
                    ))}
                  </div>
                  <label>
                    Providências
                    <textarea
                      rows={4}
                      defaultValue="Anulação da cotação de setembro e nova contratação por pregão. Revisão do processo de cotação de eventos no Sebrae/BA."
                    />
                  </label>
                </section>
                <section className="int-card" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <h3>Feedback ao denunciante</h3>
                  <label>
                    Texto público (lido pelo protocolo)
                    <textarea
                      rows={4}
                      defaultValue="Sua denúncia foi apurada e considerada parcialmente procedente. Foram adotadas medidas administrativas e o processo de contratação foi revisto."
                    />
                  </label>
                  <button className="button red" onClick={() => setScreen("D1")}>
                    Registrar resultado e encerrar
                  </button>
                </section>
              </div>
            </div>
          )}

          {screen === "D4" && (
            <div className="int-page">
              <div className="int-page-head">
                <div>
                  <div className="int-crumb">
                    <code>D4</code> Canal de Denúncias
                  </div>
                  <h1 style={{ color: "var(--red)" }}>Revelação de identidade · 2026-000091</h1>
                  <p className="int-sub">
                    Denúncia identificada, com os dados do denunciante mascarados até concordância
                    formal.
                  </p>
                </div>
              </div>
              <div className="two-cols">
                <section className="int-card">
                  <h3>Identificação do denunciante</h3>
                  <dl className="privacy-dl" style={{ gridTemplateColumns: "120px 1fr", marginTop: "12px" }}>
                    <dt>Nome</dt>
                    <dd>••••••••• ••••••</dd>
                    <dt>CPF</dt>
                    <dd>•••.•••.•••-••</dd>
                    <dt>E-mail</dt>
                    <dd>•••••@•••••</dd>
                  </dl>
                </section>
                <section className="int-card">
                  <h3>Pedido em aberto</h3>
                  <p style={{ marginTop: "8px" }}>
                    Pedido enviado em 05/11/2026 por Helena Costa. Prazo para resposta do
                    denunciante: 12/11/2026.
                  </p>
                </section>
              </div>
            </div>
          )}

          {/* ================= F1: DASHBOARDS ================= */}
          {screen === "F1" && (
            <div className="int-page">
              <div className="int-page-head">
                <div>
                  <div className="int-crumb">
                    <code>F1</code> Relatórios e BI
                  </div>
                  <h1>Dashboards</h1>
                  <p className="int-sub">
                    Outubro de 2026 · todas as unidades. Clique num número para ver a lista de
                    registros.
                  </p>
                </div>
                <div className="button-row">
                  <button className="button secondary compact" onClick={() => setScreen("F2")}>
                    Relatórios
                  </button>
                  <button className="button primary compact" onClick={() => setScreen("F3")}>
                    Exportar
                  </button>
                </div>
              </div>

              <div className="int-kpi-grid">
                <div className="int-card int-kpi">
                  <span>Recebidas</span>
                  <b>2.788</b>
                  <small>+6% sobre setembro</small>
                </div>
                <div className="int-card int-kpi">
                  <span>Tempo médio de resposta</span>
                  <b>8,4 dias úteis</b>
                  <small style={{ color: "var(--green)" }}>−0,9 dia</small>
                </div>
                <div className="int-card int-kpi">
                  <span>Resolutividade</span>
                  <b>81%</b>
                </div>
                <div className="int-card int-kpi">
                  <span>Vencidas</span>
                  <b style={{ color: "#dc2626" }}>37</b>
                  <a onClick={() => setScreen("O2")}>Ver lista</a>
                </div>
                <div className="int-card int-kpi">
                  <span>NPS</span>
                  <b>62</b>
                  <small>1.904 respostas</small>
                </div>
              </div>

              <div className="two-cols">
                <section className="int-card">
                  <h3>Por natureza</h3>
                  <div className="int-bars" style={{ marginTop: "12px" }}>
                    {[
                      ["Reclamação", 1284, "100%"],
                      ["Solicitação", 812, "63%"],
                      ["Elogio", 455, "35%"],
                      ["Sugestão", 196, "15%"],
                      ["Consulta ao Código de Ética", 41, "4%"],
                    ].map(([label, val, w]) => (
                      <div className="int-bar-row" key={label}>
                        <span>{label}</span>
                        <div className="int-progress-bar">
                          <div style={{ width: String(w) }} />
                        </div>
                        <b>{val}</b>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="int-card">
                  <h3>Por canal</h3>
                  <div className="int-bars" style={{ marginTop: "12px" }}>
                    {[
                      ["Portal", 1402, "100%"],
                      ["WhatsApp", 688, "49%"],
                      ["E-mail", 401, "29%"],
                      ["Telefone 0800", 236, "17%"],
                      ["Presencial", 61, "5%"],
                    ].map(([label, val, w]) => (
                      <div className="int-bar-row" key={label}>
                        <span>{label}</span>
                        <div className="int-progress-bar">
                          <div style={{ width: String(w) }} />
                        </div>
                        <b>{val}</b>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* ================= F2: RELATÓRIOS ================= */}
          {screen === "F2" && (
            <div className="int-page">
              <div className="int-page-head">
                <div>
                  <div className="int-crumb">
                    <code>F2</code> Relatórios e BI
                  </div>
                  <h1>Relatórios</h1>
                  <p className="int-sub">
                    Relatórios estatísticos online e históricos, parametrizáveis pelo usuário.
                  </p>
                </div>
                <div className="button-row">
                  <button className="button secondary compact" onClick={() => setScreen("F1")}>
                    Voltar aos dashboards
                  </button>
                  <button className="button primary compact" onClick={() => setScreen("F3")}>
                    Exportar este relatório
                  </button>
                </div>
              </div>
              <section className="int-card">
                <h3>Relatório de NPS</h3>
                <div className="int-table-wrap" style={{ marginTop: "14px" }}>
                  <table className="int-table">
                    <thead>
                      <tr>
                        <th>MÊS</th>
                        <th>RESPOSTAS</th>
                        <th>PROMOTORES</th>
                        <th>DETRATORES</th>
                        <th>NPS</th>
                        <th>RESOLVIDA</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Agosto</td>
                        <td>1.712</td>
                        <td>66%</td>
                        <td>12%</td>
                        <td>
                          <b>54</b>
                        </td>
                        <td>76%</td>
                      </tr>
                      <tr>
                        <td>Setembro</td>
                        <td>1.835</td>
                        <td>69%</td>
                        <td>10%</td>
                        <td>
                          <b>59</b>
                        </td>
                        <td>79%</td>
                      </tr>
                      <tr>
                        <td>Outubro</td>
                        <td>1.904</td>
                        <td>71%</td>
                        <td>9%</td>
                        <td>
                          <b>62</b>
                        </td>
                        <td>81%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}

          {/* ================= F3: EXPORTAÇÃO ================= */}
          {screen === "F3" && (
            <div className="int-page">
              <div className="int-page-head">
                <div>
                  <div className="int-crumb">
                    <code>F3</code> Relatórios e BI
                  </div>
                  <h1>Exportação</h1>
                  <p className="int-sub">
                    Exporte os registros selecionados com todos os campos. Toda exportação entra na
                    trilha de auditoria.
                  </p>
                </div>
              </div>
              <div className="int-grid-aside">
                <section className="int-card">
                  <h3>Campos selecionados (48 de 48)</h3>
                  <p className="field-hint" style={{ marginTop: "8px" }}>
                    Identificação (5), Classificação (4), Prazos e status (5), Manifestante (7),
                    Encaminhamentos (4) e Pesquisa de satisfação (3).
                  </p>
                </section>
                <section className="int-card" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <h3>Formato</h3>
                  <div className="two-cols">
                    <div className="int-card" style={{ borderColor: "var(--green)", background: "#e9f8ef" }}>
                      <b>CSV</b>
                      <p className="field-hint">UTF-8, separador ;</p>
                    </div>
                    <div className="int-card">
                      <b>XLSX</b>
                      <p className="field-hint">Planilha Excel</p>
                    </div>
                  </div>
                  <button className="button primary full" onClick={() => setModal("gerado")}>
                    Gerar arquivo
                  </button>
                </section>
              </div>
            </div>
          )}

          {/* ================= F4: DICIONÁRIO DE DADOS E BI ================= */}
          {screen === "F4" && (
            <div className="int-page">
              <div className="int-page-head">
                <div>
                  <div className="int-crumb">
                    <code>F4</code> Relatórios e BI
                  </div>
                  <h1>Dicionário de dados e conector de BI</h1>
                  <p className="int-sub">
                    Tabelas, campos, chaves e relacionamentos para Power BI e QlikSense.
                  </p>
                </div>
              </div>
              <section className="int-card">
                <h3>Tabela: manifestacao (48 campos)</h3>
                <p className="field-hint" style={{ marginTop: "6px" }}>
                  Endpoint OData: https://api.ouvidoria.sebrae.com.br/bi/v1/odata
                </p>
              </section>
            </div>
          )}

          {/* ================= G1, G2, G3: AUDITORIA ================= */}
          {screen === "G1" && (
            <div className="int-page">
              <div className="int-page-head">
                <div>
                  <div className="int-crumb">
                    <code>G1</code> Auditoria
                  </div>
                  <h1>Trilha de auditoria</h1>
                  <p className="int-sub">
                    Só para o perfil auditor. Os eventos não podem ser alterados nem apagados.
                  </p>
                </div>
              </div>
              <div className="int-table-wrap">
                <table className="int-table">
                  <thead>
                    <tr>
                      <th>DATA E HORA</th>
                      <th>USUÁRIO</th>
                      <th>OPERAÇÃO</th>
                      <th>REGISTRO AFETADO</th>
                      <th>VALOR ANTERIOR → NOVO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="protocol-number">03/11 10:52:07</td>
                      <td>Ana Paula Ribeiro</td>
                      <td>Exportação</td>
                      <td>342 registros · CSV</td>
                      <td>—</td>
                    </tr>
                    <tr>
                      <td className="protocol-number">03/11 11:02:44</td>
                      <td>Helena Costa</td>
                      <td>Visualização de denúncia</td>
                      <td className="protocol-number">2026-000140</td>
                      <td>—</td>
                    </tr>
                    <tr>
                      <td className="protocol-number">23/10 09:05:12</td>
                      <td>Ana Paula Ribeiro</td>
                      <td>Alteração de classificação</td>
                      <td className="protocol-number">2026-000123</td>
                      <td>Cursos online → Cursos presenciais</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {screen === "G2" && (
            <div className="int-page">
              <div className="int-page-head">
                <div>
                  <div className="int-crumb">
                    <code>G2</code> Auditoria
                  </div>
                  <h1>Alertas de segurança</h1>
                  <p className="int-sub">
                    Fila de alertas de uso indevido, com tratamento e justificativa.
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  [
                    "Exportação em massa",
                    "Diego Martins exportou 6.420 registros em 4 minutos",
                    "03/11 10:14",
                    "Bloqueio automático aplicado",
                  ],
                  [
                    "Consultas seguidas a denúncias sigilosas",
                    "Usuário de Sebrae/MG abriu 12 denúncias em 40 minutos",
                    "03/11 09:30",
                    "Bloqueio automático aplicado",
                  ],
                  [
                    "Acesso fora do horário",
                    "Carlos Eduardo Pinto acessou às 02:14",
                    "03/11 02:14",
                    "Aguardando justificativa",
                  ],
                ].map(([t, d, w, s]) => (
                  <article className="int-card int-toolbar" key={t}>
                    <div>
                      <b>{t}</b> <span className="field-hint">· {w}</span>
                      <p style={{ margin: "4px 0" }}>{d}</p>
                      <span className="field-hint">{s}</span>
                    </div>
                    <button className="button primary compact">Tratar</button>
                  </article>
                ))}
              </div>
            </div>
          )}

          {screen === "G3" && (
            <div className="int-page">
              <div className="int-page-head">
                <div>
                  <div className="int-crumb">
                    <code>G3</code> Auditoria
                  </div>
                  <h1>Anexos bloqueados</h1>
                  <p className="int-sub">
                    Cada arquivo barrado pelo antivírus, com origem, destino e ação tomada.
                  </p>
                </div>
              </div>
              <div className="int-table-wrap">
                <table className="int-table">
                  <thead>
                    <tr>
                      <th>DATA E HORA</th>
                      <th>ARQUIVO</th>
                      <th>ORIGEM</th>
                      <th>DESTINATÁRIO</th>
                      <th>AÇÃO</th>
                      <th>MOTIVO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="clickable-row" onClick={() => setScreen("O4")}>
                      <td className="protocol-number">21/10 14:31</td>
                      <td>boleto_2via.pdf</td>
                      <td>Portal · 2026-000123</td>
                      <td>Ouvidoria Sebrae/GO</td>
                      <td>
                        <span className="int-badge red">Quarentena</span>
                      </td>
                      <td>Trojan.PDF.Agent</td>
                    </tr>
                    <tr>
                      <td className="protocol-number">30/10 08:12</td>
                      <td>notas.docm</td>
                      <td>E-mail · ouvidoria@sebrae.com.br</td>
                      <td>Triagem</td>
                      <td>
                        <span className="int-badge red">Quarentena</span>
                      </td>
                      <td>Macro maliciosa</td>
                    </tr>
                    <tr>
                      <td className="protocol-number">28/10 19:47</td>
                      <td>video_reuniao.avi</td>
                      <td>WhatsApp · 2026-000102</td>
                      <td>Ouvidoria Sebrae/BA</td>
                      <td>
                        <span className="int-badge">Descartado</span>
                      </td>
                      <td>Arquivo corrompido</td>
                    </tr>
                    <tr>
                      <td className="protocol-number">25/10 11:03</td>
                      <td>planilha.xls.exe</td>
                      <td>Portal · 2026-000119</td>
                      <td>Comissão de Ética</td>
                      <td>
                        <span className="int-badge red">Quarentena</span>
                      </td>
                      <td>Extensão dupla executável</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="field-hint">O remetente foi avisado na hora do envio.</p>
            </div>
          )}

          {/* ================= A1..A7 & C1: ADMINISTRAÇÃO E COMUNICAÇÃO ================= */}
          {screen === "A1" && (
            <div className="int-page">
              <div className="int-page-head">
                <div>
                  <div className="int-crumb">
                    <code>A1</code> Administração
                  </div>
                  <h1>Organização e filas</h1>
                  <p className="int-sub">
                    Filas de prorrogação e de bloqueio, estrutura, usuários, perfis e permissões.
                  </p>
                </div>
              </div>
              <div className="privacy-tabs">
                {[
                  ["f", "Filas (4)"],
                  ["e", "Estrutura"],
                  ["u", "Usuários"],
                  ["p", "Perfis × permissões"],
                  ["t", "Usuários temporários"],
                ].map(([k, l]) => (
                  <button
                    key={k}
                    type="button"
                    className={a1Tab === k ? "active" : ""}
                    onClick={() => setA1Tab(k as any)}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <section className="int-card">
                <h3>Pedidos de prorrogação e bloqueio</h3>
                <p className="field-hint" style={{ marginTop: "6px" }}>
                  As filas mostram protocolo, etapa, quem pediu e justificativa, nunca o conteúdo
                  do caso.
                </p>
              </section>
            </div>
          )}

          {["A2", "A3", "A4", "A5", "A6", "A7", "C1"].includes(screen) && (
            <div className="int-page">
              <div className="int-page-head">
                <div>
                  <div className="int-crumb">
                    <code>{screen}</code> Administração / Comunicação
                  </div>
                  <h1>
                    {screen === "A2" && "Formulários e classificação"}
                    {screen === "A3" && "Fluxos e prazos"}
                    {screen === "A4" && "Textos e notificações"}
                    {screen === "A5" && "Segurança e privacidade"}
                    {screen === "A6" && "Integrações"}
                    {screen === "A7" && "Importação em bloco"}
                    {screen === "C1" && "Campanhas de e-mail"}
                  </h1>
                  <p className="int-sub">
                    Configuração parametrizada sem código, com registro integral na trilha de
                    auditoria.
                  </p>
                </div>
              </div>
              <section className="int-card">
                <p>
                  Módulo <b>{screen}</b> ativo e padronizado no sistema interno da Ouvidoria Sebrae.
                </p>
              </section>
            </div>
          )}

          {/* ================= H1: CENTRAL DE AJUDA ================= */}
          {screen === "H1" && (
            <div className="int-page">
              <div className="int-page-head">
                <div>
                  <div className="int-crumb">
                    <code>H1</code> Ajuda e capacitação
                  </div>
                  <h1>Central de ajuda e capacitação</h1>
                  <p className="int-sub">
                    Vídeos, manuais, guias rápidos e apresentações por perfil. Conteúdo atualizado
                    em até 30 dias depois de cada mudança.
                  </p>
                </div>
              </div>

              <div className="privacy-tabs">
                {[
                  ["op", "Operadores"],
                  ["gest", "Administradores e gestores"],
                  ["int", "Interlocutores"],
                  ["et", "Comissões de Ética"],
                ].map(([k, l]) => (
                  <button
                    key={k}
                    type="button"
                    className={h1Tab === k ? "active" : ""}
                    onClick={() => setH1Tab(k as any)}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <div className="how-grid">
                {[
                  ["Vídeo", "Triagem e classificação", "6 min"],
                  ["Manual", "Tratamento da manifestação", "32 páginas"],
                  ["Guia rápido", "Encaminhar e revisar minutas", "2 páginas"],
                ].map(([type, title, duration]) => (
                  <section className="int-card" key={title}>
                    <span className="int-badge green">{type}</span>
                    <strong style={{ display: "block", marginTop: "8px", fontSize: "16px" }}>
                      {title}
                    </strong>
                    <span className="field-hint">{duration}</span>
                  </section>
                ))}
              </div>

              <section className="int-card">
                <h3>Manual por tela</h3>
                <div className="two-cols" style={{ marginTop: "12px" }}>
                  <div className="int-toolbar">
                    <span>
                      <b>O4</b> Tratamento da manifestação
                    </span>
                    <a onClick={() => setScreen("O4")}>Abrir a tela</a>
                  </div>
                  <div className="int-toolbar">
                    <span>
                      <b>R1</b> Responder demanda
                    </span>
                    <a onClick={() => setScreen("R1")}>Abrir a tela</a>
                  </div>
                  <div className="int-toolbar">
                    <span>
                      <b>D2</b> Caso de denúncia
                    </span>
                    <a onClick={() => setScreen("D2")}>Abrir a tela</a>
                  </div>
                  <div className="int-toolbar">
                    <span>
                      <b>A1</b> Organização e permissões
                    </span>
                    <a onClick={() => setScreen("A1")}>Abrir a tela</a>
                  </div>
                </div>
              </section>
            </div>
          )}
        </main>
      </div>

      {/* ================= MODAIS INTERNOS ================= */}
      {modal && (
        <div className="int-modal-overlay" onClick={() => setModal(null)}>
          <div className="int-modal" onClick={(e) => e.stopPropagation()}>
            <div className="int-modal-head">
              <h3>
                {modal === "notif" && "Notificações"}
                {modal === "categoria" && "Buscar categoria"}
                {modal === "arquivar" && "Arquivar · 2026-000135"}
                {modal === "juntar" && "Juntar a outro protocolo"}
                {modal === "converter" && "Converter em denúncia"}
                {modal === "minuta" && "Revisar minuta"}
                {modal === "encaminhar" && "Encaminhar para área"}
                {modal === "complemento" && "Pedir complemento ao manifestante"}
                {modal === "gerado" && "Exportação pronta"}
              </h3>
              <button
                type="button"
                className="int-modal-close"
                onClick={() => setModal(null)}
                aria-label="Fechar"
              >
                ×
              </button>
            </div>

            <div className="int-modal-body">
              {modal === "notif" && (
                <>
                  <div className="complaint-notice" style={{ marginTop: 0 }}>
                    <span>
                      <b>2026-000098 venceu hoje.</b> Prazo era 03/11/2026, responsável Ana Paula
                      Ribeiro.
                    </span>
                  </div>
                  <div className="info">
                    <span>
                      <b>Minuta devolvida</b> pela Unidade de Capacitação GO em 2026-000123.
                    </span>
                  </div>
                  <div className="info">
                    <span>
                      <b>Novo e-mail do manifestante</b> anexado a 2026-000117.
                    </span>
                  </div>
                </>
              )}

              {modal === "categoria" && (
                <>
                  <input placeholder="Buscar categoria entre 47…" />
                  <div className="int-card" style={{ padding: "14px" }}>
                    <b>▾ Capacitação (12)</b>
                    <div style={{ paddingLeft: "16px", marginTop: "6px" }}>
                      <b>▾ Cursos presenciais</b>
                      <div style={{ paddingLeft: "16px", marginTop: "4px", color: "var(--green)" }}>
                        • <b>Inscrição (selecionada)</b>
                        <br />• Certificado
                        <br />• Cancelamento e reembolso
                      </div>
                    </div>
                  </div>
                  <p className="field-hint">
                    47 categorias em até 3 níveis. Ao confirmar a triagem, o prazo é atribuído
                    automaticamente.
                  </p>
                </>
              )}

              {modal === "arquivar" && (
                <>
                  <div className="privacy-type-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
                    <button
                      type="button"
                      className={archiveType === "Spam" ? "selected" : ""}
                      onClick={() => setArchiveType("Spam")}
                    >
                      <strong>Spam</strong>
                      <span>Sem e-mail nem pesquisa ao cidadão</span>
                    </button>
                    <button
                      type="button"
                      className={archiveType === "Duplicada" ? "selected" : ""}
                      onClick={() => setArchiveType("Duplicada")}
                    >
                      <strong>Duplicada</strong>
                      <span>E-mail com o protocolo original, sem pesquisa</span>
                    </button>
                  </div>
                  <label>
                    Protocolo original (se duplicada)
                    <input placeholder="2026-000000" />
                  </label>
                  <label>
                    Motivo <span className="req-star">*</span>
                    <textarea rows={2} defaultValue="Mensagem sem relação com o Sebrae." />
                  </label>
                </>
              )}

              {modal === "juntar" && (
                <>
                  <label>
                    Protocolo de destino <span className="req-star">*</span>
                    <input defaultValue="2026-000123" />
                  </label>
                  <p className="field-hint">
                    Este item fica arquivado com o vínculo. O relato e os anexos entram no protocolo
                    de destino como complemento com data.
                  </p>
                </>
              )}

              {modal === "converter" && (
                <>
                  <label>
                    Motivo da conversão <span className="req-star">*</span>
                    <textarea
                      rows={3}
                      defaultValue="Relato de pedido de vantagem indevida por analista da agência."
                    />
                  </label>
                  <p className="field-hint">
                    O registro vai para a <b>Comissão padrão</b>, com o mesmo protocolo e a mesma
                    chave, e deixa de existir na Ouvidoria.
                  </p>
                </>
              )}

              {modal === "minuta" && (
                <>
                  <p className="field-hint">
                    Minuta enviada por Rafael Lima em 03/11 às 08:40. Edite antes de enviar ao
                    manifestante.
                  </p>
                  <textarea
                    rows={6}
                    defaultValue={
                      "Olá, Carla.\n\nA Unidade de Capacitação do Sebrae/GO confirmou que sua vaga na turma Empretec de 18 a 23/11 foi garantida. O valor não será cobrado de novo e a confirmação foi enviada para o seu e-mail.\n\nPedimos desculpas pela demora no retorno da Central.\n\nOuvidoria Sebrae/GO"
                    }
                  />
                </>
              )}

              {modal === "encaminhar" && (
                <>
                  <div className="two-cols">
                    <label>
                      Área <span className="req-star">*</span>
                      <select defaultValue="Unidade de Capacitação — Sebrae/GO">
                        <option>Unidade de Capacitação — Sebrae/GO</option>
                        <option>Unidade Financeira — Sebrae/GO</option>
                      </select>
                    </label>
                    <label>
                      Interlocutor <span className="req-star">*</span>
                      <select defaultValue="Rafael Lima">
                        <option>Rafael Lima</option>
                        <option>Juliana Prado</option>
                      </select>
                    </label>
                  </div>
                  <label>
                    Orientação ao interlocutor
                    <textarea
                      rows={3}
                      defaultValue="Rafael, confirme se o pagamento da Carla foi localizado e se há vaga na turma de novembro."
                    />
                  </label>
                </>
              )}

              {modal === "complemento" && (
                <>
                  <label>
                    Mensagem
                    <textarea
                      rows={3}
                      defaultValue="Carla, para localizar sua inscrição, envie o número do pedido que aparece no e-mail de confirmação do pagamento."
                    />
                  </label>
                  <label>
                    Prazo para resposta
                    <input defaultValue="10/11/2026" />
                  </label>
                </>
              )}

              {modal === "gerado" && (
                <p>
                  <b>ouvidoria_encerradas_out2026.csv</b> · 342 registros · 48 campos · 412 KB
                  gerado e registrado na trilha de auditoria.
                </p>
              )}
            </div>

            <div className="int-modal-foot">
              <button className="button secondary compact" onClick={() => setModal(null)}>
                Fechar
              </button>
              {modal !== "notif" && modal !== "gerado" && (
                <button
                  className={`button ${modal === "converter" ? "red" : "primary"} compact`}
                  onClick={() => {
                    const m = modal;
                    setModal(null);
                    if (m === "converter") {
                      setRole("etica");
                      setScreen("D1");
                    } else if (m === "minuta") {
                      goPublic("rating");
                    }
                  }}
                >
                  Confirmar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
