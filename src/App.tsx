import { useRef, useState } from "react";

type Page =
  | "login"
  | "create-password"
  | "home"
  | "privacy"
  | "internal"
  | "type"
  | "identity"
  | "report"
  | "review"
  | "receipt"
  | "tracking-search"
  | "tracking-waiting"
  | "tracking-analysis"
  | "tracking-answered"
  | "rating"
  | "complaint-intro"
  | "complaint-report"
  | "complaint-receipt"
  | "complaint-tracking-waiting"
  | "complaint-tracking-analysis"
  | "complaint-tracking-concluded";

const steps = ["Tipo de manifestação", "Identificação", "Relato e anexos", "Revisão e envio"];

function Accessibility({
  scale,
  setScale,
  contrast,
  setContrast,
}: {
  scale: number;
  setScale: (value: number) => void;
  contrast: boolean;
  setContrast: (value: boolean) => void;
}) {
  const [activeFont, setActiveFont] = useState<"plus" | "minus" | "normal" | null>(null);
  return (
    <div className="accessibility">
      <div className="wide accessibility-inner">
        <strong>Acessibilidade</strong>
        <button
          className={scale > 1 || activeFont === "plus" ? "active" : ""}
          aria-pressed={scale > 1 || activeFont === "plus"}
          onClick={() => {
            const next = Math.min(1.2, Math.round((scale + 0.1) * 10) / 10);
            setScale(next);
            setActiveFont(next > 1 ? "plus" : next < 1 ? "minus" : "normal");
          }}
        >
          A+
        </button>
        <button
          className={scale < 1 || activeFont === "minus" ? "active" : ""}
          aria-pressed={scale < 1 || activeFont === "minus"}
          onClick={() => {
            const next = Math.max(0.9, Math.round((scale - 0.1) * 10) / 10);
            setScale(next);
            setActiveFont(next < 1 ? "minus" : next > 1 ? "plus" : "normal");
          }}
        >
          A−
        </button>
        <button
          className={activeFont === "normal" && scale === 1 ? "active" : ""}
          aria-pressed={activeFont === "normal" && scale === 1}
          onClick={() => {
            setScale(1);
            setActiveFont((prev) => (prev === "normal" ? null : "normal"));
          }}
        >
          A
        </button>
        <button
          className={contrast ? "active" : ""}
          aria-pressed={contrast}
          onClick={() => setContrast(!contrast)}
        >
          Alto contraste
        </button>
        <span>· Pensado para WCAG 2.1 AA</span>
        <a href="#libras">Libras (VLibras, abre em nova aba)</a>
      </div>
    </div>
  );
}

function Header({ go, complaint = false }: { go: (page: Page) => void; complaint?: boolean }) {
  return (
    <header className={`site-header ${complaint ? "complaint-header" : ""}`}>
      <div className="wide header-inner">
        <button className="brand" onClick={() => go("home")}>
          <span>icone da empresa</span>
          <b>{complaint ? "Canal de Denúncias" : "Ouvidoria"}</b>
        </button>
        <nav>
          <button onClick={() => go("home")}>Início</button>
          <button onClick={() => go(complaint ? "complaint-tracking-waiting" : "tracking-search")}>
            Acompanhar protocolo
          </button>
          <button onClick={() => go("internal")}>Painel interno</button>
        </nav>
      </div>
    </header>
  );
}

function Footer({ go, login = false }: { go: (page: Page) => void; login?: boolean }) {
  return (
    <footer className={login ? "login-footer" : ""}>
      <div className="wide footer-inner">
        <strong>icone da empresa</strong>
        <div className="footer-links">
          <span>Ouvidoria Nacional</span>
          <span>
            Central de Relacionamento: <a href="tel:08005700800">0800 570 0800</a>
          </span>
          <a onClick={() => go("privacy")}>Política de privacidade (LGPD)</a>
        </div>
      </div>
    </footer>
  );
}

function Login({ go }: { go: (page: Page) => void }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="login-nav">
        <div className="wide login-nav-inner">
          <strong>icone da empresa</strong>
          <div>
            Ouvidoria Nacional　 Central de Relacionamento: <a>0000 570 0000</a>　{" "}
            <a onClick={() => go("privacy")}>Política de privacidade (LGPD)</a>
          </div>
        </div>
      </div>
      <main className="login-main">
        <section className="login-card">
          <div className="login-header">
            <h1>Entrar</h1>
            <p>Informe suas credenciais para acessar o painel de atendimento.</p>
          </div>
          <label>
            E-mail
            <input type="email" defaultValue="fernanda@consultoriarocha.com.br" />
          </label>
          <div className="login-password-group">
            <div className="login-password-head">
              <strong>Senha</strong>
              <a className="forgot-link" onClick={() => go("create-password")}>
                Esqueci minha senha
              </a>
            </div>
            <div className="login-password-field">
              <input type={show ? "text" : "password"} placeholder="Digite sua senha" />
              <button
                type="button"
                className="login-show-btn"
                onClick={() => setShow(!show)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                {show ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>
          <label className="login-remember">
            <input type="checkbox" />
            <span>Manter conectado neste dispositivo</span>
          </label>
          <button className="button primary full login-submit" onClick={() => go("home")}>
            Entrar com senha
          </button>
          <button className="button secondary full login-submit" onClick={() => go("internal")}>
            Acessar painel interno
          </button>
        </section>
      </main>
    </>
  );
}

function CreatePassword({ go }: { go: (page: Page) => void }) {
  const [showNew, setShowNew] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  return (
    <>
      <div className="login-nav">
        <div className="wide login-nav-inner">
          <strong>icone da empresa</strong>
          <div>
            Ouvidoria Nacional　 Central de Relacionamento: <a>0000 570 0000</a>　{" "}
            <a onClick={() => go("privacy")}>Política de privacidade (LGPD)</a>
          </div>
        </div>
      </div>
      <main className="login-main">
        <section className="login-card create-password-card">
          <div className="login-header">
            <h1>Crie sua senha</h1>
            <p>
              Convite para <b>juliana.prado@go.sebrae.com.br</b> · válido até 10/11/2026 às 16:40
              (2 horas a partir do envio).
            </p>
          </div>
          <div className="login-password-group">
            <div className="login-password-head">
              <strong>Nova senha</strong>
            </div>
            <div className="login-password-field">
              <input
                type={showNew ? "text" : "password"}
                defaultValue="Senhaboa2026!"
                placeholder="Digite a nova senha"
              />
              <button
                type="button"
                className="login-show-btn"
                onClick={() => setShowNew(!showNew)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                {showNew ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            <small className="password-hint">Mínimo de 12 caracteres (política da A5)</small>
          </div>
          <div className="login-password-group">
            <div className="login-password-head">
              <strong>Repita a senha</strong>
            </div>
            <div className="login-password-field">
              <input
                type={showRepeat ? "text" : "password"}
                defaultValue="Senhaboa2026!"
                placeholder="Repita a nova senha"
              />
              <button
                type="button"
                className="login-show-btn"
                onClick={() => setShowRepeat(!showRepeat)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                {showRepeat ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>
          <button className="button primary full login-submit" onClick={() => go("home")}>
            Criar senha e entrar
          </button>
          <div className="complaint-notice create-password-notice">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span>
              Convite vencido mostra “convite expirado” e pede ao Administrador (ou ao operador, no
              caso de temporário) que reenvie. O reenvio gera um token novo.
            </span>
          </div>
          <a className="forgot-link back-to-login" onClick={() => go("login")}>
            ← Voltar para o login
          </a>
        </section>
      </main>
    </>
  );
}

function Home({ go }: { go: (page: Page) => void }) {
  const [showKey, setShowKey] = useState(false);
  return (
    <>
      <section className="home-hero">
        <img src="/assets/home-hero.svg" alt="" />
        <div className="wide hero-content">
          <p className="eyebrow">Ouvidoria do Sebrae</p>
          <h1>Olá! Como podemos ajudar?</h1>
          <p>
            Estamos ao seu lado para ouvir você. Escolha o canal que combina com o seu caso e conte
            o que aconteceu com as suas palavras.
          </p>
        </div>
      </section>
      <main className="wide home-content">
        <section id="canais" className="channels-section">
          <h2>Canais de Escuta e Acompanhamento</h2>
          <p>
            Escolha o canal adequado para enviar sua manifestação ou acompanhe o andamento de um
            protocolo já registrado.
          </p>
          <div className="channel-grid">
            <article className="channel-card">
              <h2>Fale com a Ouvidoria</h2>
              <p>
                Para conversar sobre um atendimento, curso, consultoria, evento ou serviço do
                Sebrae.
              </p>
              <div className="tags">
                {[
                  "Elogio",
                  "Reclamação",
                  "Solicitação",
                  "Sugestão",
                  "Consulta ao Código de Ética",
                ].map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <p className="small">
                Damos uma resposta conclusiva em até 30 dias. Você pode se identificar ou enviar de
                forma anônima.
              </p>
              <button className="button primary" onClick={() => go("type")}>
                Registrar manifestação
                <img className="button-icon" src="/assets/arrow-white.svg" alt="" />
              </button>
            </article>
            <article className="channel-card danger">
              <h2>Canal de Denúncias</h2>
              <p>
                Para relatar fraude, corrupção, assédio, conflito de interesse ou outra violação do
                Código de Ética.
              </p>
              <ul className="check-list">
                <li>
                  <img src="/assets/check-red.svg" alt="" />
                  <span>Você decide se quer se identificar ou ficar anônimo.</span>
                </li>
                <li>
                  <img src="/assets/check-red.svg" alt="" />
                  <span>Não registramos IP, navegador nem localização.</span>
                </li>
                <li>
                  <img src="/assets/check-red.svg" alt="" />
                  <span>Só a Comissão de Ética tem acesso ao relato.</span>
                </li>
              </ul>
              <button className="button red" onClick={() => go("complaint-intro")}>
                Fazer uma denúncia
                <img className="button-icon" src="/assets/arrow-white.svg" alt="" />
              </button>
            </article>
          </div>
        </section>
        <section>
          <h2>Como funciona</h2>
          <div className="how-grid">
            {[
              ["1", "Conte o que aconteceu", "Escreva do seu jeito. Se quiser, anexe arquivos."],
              [
                "2",
                "Guarde seu protocolo",
                "No comprovante você recebe um número e uma chave de acesso.",
              ],
              ["3", "Acompanhe a resposta", "Consulte quando quiser. Respondemos em até 30 dias."],
            ].map(([n, title, text]) => (
              <div className="how" key={n}>
                <b>{n}</b>
                <p>
                  <strong>{title}</strong>
                  <br />
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="follow-card">
          <div className="follow-header">
            <h2>Acompanhar meu protocolo</h2>
            <p>Use o número do protocolo e a chave de acesso que você recebeu no comprovante.</p>
          </div>
          <div className="follow-fields">
            <label>
              Número do protocolo
              <input placeholder="2026-000000" />
            </label>
            <label>
              Chave de acesso
              <div className="follow-key-field">
                <input
                  type={showKey ? "text" : "password"}
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                />
                <button
                  type="button"
                  className="follow-key-toggle"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </label>
            <button className="button primary follow-submit" onClick={() => go("tracking-waiting")}>
              Consultar
            </button>
          </div>
        </section>
        <section>
          <h2>Não sabe qual escolher?</h2>
          <p>Sem problema. Veja qual caminho serve melhor para o seu caso.</p>
          <div className="choice-grid">
            <div>
              <strong>Use a Ouvidoria se você quer...</strong>
              <p>
                · reclamar de um atendimento, curso ou cobrança;
                <br />· elogiar uma pessoa ou um serviço;
                <br />· pedir algo ou dar uma sugestão.
              </p>
            </div>
            <div>
              <strong>Use o Canal de Denúncias se você viu...</strong>
              <p>
                · fraude ou corrupção;
                <br />· assédio ou conflito de interesse;
                <br />· qualquer outra violação do Código de Ética.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function FormHero({
  title,
  step,
  className = "",
}: {
  title: string;
  step: number;
  className?: string;
}) {
  return (
    <>
      <section className={`form-hero ${className}`}>
        <div className="form-width">
          <p className="eyebrow">Ouvidoria · Registrar manifestação</p>
          <h1>{title}</h1>
          <p>Etapa {step} de 4 · Canal “Portal”, data e hora gravados automaticamente</p>
        </div>
      </section>
      <div className="form-width">
        <div className="steps">
          {steps.map((item, i) => (
            <div className={i + 1 <= step ? "done" : ""} key={item}>
              <span></span>
              <p>
                {i + 1}. {item}
                {i + 1 < step ? " ✓" : ""}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function FormActions({
  back,
  next,
  nextLabel = "Avançar",
}: {
  back: () => void;
  next: () => void;
  nextLabel?: string;
}) {
  return (
    <div className="form-actions">
      <button className="button secondary" onClick={back}>
        Voltar
      </button>
      <button className="button primary" onClick={next}>
        {nextLabel}
      </button>
    </div>
  );
}

function TypeStep({ go }: { go: (page: Page) => void }) {
  const [kind, setKind] = useState("Reclamação");
  const options = [
    ["Elogio", "Reconhecer um bom atendimento"],
    ["Reclamação", "Algo não saiu como esperado"],
    ["Solicitação", "Pedir uma providência"],
    ["Sugestão", "Propor uma melhoria"],
    ["Consulta ao Código de Ética", "Tirar dúvida sobre conduta"],
  ];
  return (
    <>
      <FormHero title="Tipo e assunto" step={1} />
      <main className="form-width">
        <section className="form-card">
          <h2>O que você quer registrar?</h2>
          <div className="radio-list">
            {options.map(([title, text]) => (
              <label key={title} className={kind === title ? "selected" : ""}>
                <input
                  type="radio"
                  name="kind"
                  checked={kind === title}
                  onChange={() => setKind(title)}
                />
                <span>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </span>
              </label>
            ))}
          </div>
          <div className="two-cols">
            <label>
              Assunto <small>(obrigatório)</small>
              <select defaultValue="">
                <option value="" disabled>
                  Escolha um assunto
                </option>
                <option>Cursos e capacitações</option>
              </select>
            </label>
            <label>
              Unidade do Sebrae <small>(obrigatório)</small>
              <select defaultValue="">
                <option value="" disabled>
                  Escolha a unidade
                </option>
                <option>Sebrae/GO</option>
              </select>
            </label>
          </div>
          <label>
            Protocolo anterior <small>(opcional)</small>
            <p>
              Se o assunto já foi tratado, informe o protocolo e as duas manifestações ficam
              ligadas. Manifestação encerrada não é reaberta.
            </p>
            <input placeholder="2026-000000" />
          </label>
          <div className="info">
            <img src="/assets/info.svg" alt="" />É uma denúncia de fraude, assédio ou corrupção?{" "}
            <u>
              <b>Use o Canal de Denúncias (abre em nova aba).</b>
            </u>
          </div>
        </section>
        <FormActions back={() => go("home")} next={() => go("identity")} />
      </main>
    </>
  );
}

function IdentityStep({
  go,
  anonymous,
  setAnonymous,
}: {
  go: (page: Page) => void;
  anonymous: boolean;
  setAnonymous: (v: boolean) => void;
}) {
  return (
    <>
      <FormHero title="Identificação" step={2} className="identity-form-hero" />
      <main className="form-width">
        <section className="form-card identity-card">
          <div>
            <h2>Como você quer se manifestar?</h2>
            <p className="choice-subtitle">
              Selecione uma das opções abaixo para definir o nível de identificação do seu relato.
            </p>
          </div>
          <div className="identity-options">
            <button
              type="button"
              className={!anonymous ? "selected identified-option" : "identified-option"}
              onClick={() => setAnonymous(false)}
            >
              <div className="option-card-top">
                <div className="option-title-group">
                  <div className="option-icon-badge">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" />
                      <line x1="5" y1="20" x2="19" y2="20" />
                    </svg>
                  </div>
                  <strong>Quero me identificar</strong>
                </div>
                <div className="option-radio-indicator">
                  {!anonymous && <img src="/assets/check-white.svg" alt="" />}
                </div>
              </div>
              <span>Recebo respostas por e-mail e acompanho pelo protocolo</span>
            </button>
            <button
              type="button"
              className={anonymous ? "selected" : ""}
              onClick={() => setAnonymous(true)}
            >
              <div className="option-card-top">
                <div className="option-title-group">
                  <div className="option-icon-badge">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <strong>Enviar anônimo</strong>
                </div>
                <div className="option-radio-indicator">
                  {anonymous && <img src="/assets/check-white.svg" alt="" />}
                </div>
              </div>
              <span>Acompanho só pelo protocolo e pela chave de acesso</span>
            </button>
          </div>
          {anonymous ? (
            <p>
              Você escolheu enviar de forma anônima. Não pedimos nome, CPF nem e-mail. Guarde bem o
              protocolo e a chave de acesso no final.
            </p>
          ) : (
            <div className="fields-grid">
              <label>
                Nome completo <small>(obrigatório)</small>
                <input />
              </label>
              <label>
                CPF <small>(obrigatório)</small>
                <input placeholder="000.000.000-00" />
              </label>
              <label>
                E-mail <small>(obrigatório)</small>
                <input type="email" />
              </label>
              <label>
                Telefone <small>(opcional)</small>
                <input placeholder="(00) 00000-0000" />
              </label>
              <label>
                UF <small>(obrigatório)</small>
                <select>
                  <option>Escolha</option>
                  <option>GO</option>
                </select>
              </label>
              <label>
                Você é <small>(obrigatório)</small>
                <select>
                  <option>Escolha</option>
                  <option>Cliente</option>
                </select>
              </label>
              <label>
                Gênero <small>(opcional)</small>
                <select>
                  <option>Prefiro não informar</option>
                </select>
              </label>
              <label className="check">
                <input type="checkbox" /> Autorizo o Sebrae a entrar em contato comigo sobre esta
                manifestação e a usar meus dados conforme a LGPD.
              </label>
            </div>
          )}
        </section>
        <FormActions back={() => go("type")} next={() => go("report")} />
      </main>
    </>
  );
}

function ReportStep({
  go,
  report,
  setReport,
}: {
  go: (p: Page) => void;
  report: string;
  setReport: (v: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState(0);
  return (
    <>
      <FormHero title="Relato e anexos" step={3} />
      <main className="form-width">
        <section className="form-card">
          <label>
            Conte o que aconteceu <small>(obrigatório)</small>
            <p>
              Escreva do seu jeito. Quanto mais detalhes, melhor podemos ajudar. Mínimo de 30
              caracteres.
            </p>
            <textarea value={report} onChange={(e) => setReport(e.target.value)} />
          </label>
          <p style={{ marginTop: "-14px" }}>
            {report.length} caracteres ·{" "}
            {report.length < 30 ? `faltam ${30 - report.length} para o mínimo` : "mínimo atingido"}
          </p>
          <label>
            Anexos <small>(opcional)</small>
          </label>
          <div className="dropzone">
            <strong>Arraste arquivos até aqui</strong> ou use o botão.
            <button className="button secondary" onClick={() => fileRef.current?.click()}>
              Escolher arquivos
            </button>
            <input
              ref={fileRef}
              hidden
              type="file"
              multiple
              onChange={(e) => setFiles(e.target.files?.length || 0)}
            />
            <span>
              {files
                ? `${files} arquivo(s) selecionado(s)`
                : "Até 10 arquivos de até 10 MB cada. Formatos: PDF, JPG, JPEG, PNG, AVI, MP3, MP4 e OGG."}
            </span>
          </div>
        </section>
        <FormActions back={() => go("identity")} next={() => go("review")} />
      </main>
    </>
  );
}

function ReviewStep({ go, report }: { go: (p: Page) => void; report: string }) {
  return (
    <>
      <FormHero title="Revisão e envio" step={4} />
      <main className="form-width">
        <section className="form-card review">
          <h2>Confira antes de enviar</h2>
          <dl>
            <dt>Tipo</dt>
            <dd>Reclamação</dd>
            <dt>Assunto</dt>
            <dd>Cursos e capacitações</dd>
            <dt>Unidade</dt>
            <dd>Sebrae/GO</dd>
            <dt>Identificação</dt>
            <dd>Lucas Gabriel de Oliveira Santos · lucas.oliveira.santos92@exemplo.com</dd>
            <dt>Contato autorizado</dt>
            <dd>Sim</dd>
            <dt>Anexos</dt>
            <dd>Nenhum</dd>
          </dl>
          <hr />
          <strong>O que você contou</strong>
          <p className="report-preview">{report || "Aconteceu isso e isso.isso isso"}</p>
          <div className="info" style={{ flexDirection: "column" }}>
            <span style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
              <img src="/assets/info.svg" alt="" />
              <span>
                Você vai receber o número do protocolo e uma chave de acesso.{" "}
                <b>Guarde a chave: ela aparece uma única vez.</b>
              </span>
            </span>
          </div>
        </section>
        <FormActions
          back={() => go("report")}
          next={() => go("receipt")}
          nextLabel="Enviar manifestação"
        />
      </main>
    </>
  );
}

function Receipt({ go }: { go: (p: Page) => void }) {
  const [copied, setCopied] = useState(false);
  const key = "UMA3-LRNE-5VTL-W7YN";
  return (
    <>
      <section className="form-hero receipt-hero">
        <div className="form-width">
          <p className="eyebrow">Ouvidoria · Comprovante</p>
          <h1>Manifestação registrada</h1>
        </div>
      </section>
      <main className="form-width">
        <section className="form-card receipt-card">
          <label>
            Número do protocolo<div className="code-box">2026-513516</div>
          </label>
          <label>
            Chave de acesso<div className="code-box">{key}</div>
          </label>
          <div className="button-row">
            <button
              className="button receipt-action-btn compact"
              onClick={() => {
                navigator.clipboard?.writeText(key);
                setCopied(true);
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              {copied ? "Chave copiada" : "Copiar chave"}
            </button>
            <button className="button receipt-action-btn compact" onClick={() => window.print()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Baixar comprovante
            </button>
          </div>
          <div className="info">
            <img src="/assets/info.svg" alt="" />A chave aparece só agora. Também enviamos o
            comprovante para l•••••@exem.com.
          </div>
          <dl>
            <dt>Registrada em</dt>
            <dd>
              <b>13/11/2026 às 17:53</b>
            </dd>
            <dt>Tipo</dt>
            <dd>
              <b>Reclamação · Cursos e capacitações</b>
            </dd>
            <dt>Prazo de resposta</dt>
            <dd>
              <b>até 13/12/2026 (30 dias)</b>
            </dd>
          </dl>
        </section>
        <div className="form-actions">
          <button className="button secondary" onClick={() => go("home")}>
            Voltar ao início
          </button>
          <button className="button primary" onClick={() => go("tracking-waiting")}>
            Acompanhar protocolo
          </button>
        </div>
      </main>
    </>
  );
}

function Tracking({
  go,
  state,
}: {
  go: (p: Page) => void;
  state: "search" | "waiting" | "analysis" | "answered";
}) {
  const [show, setShow] = useState(false);
  const searching = state === "search";
  const waiting = state === "waiting";
  const answered = state === "answered";
  return (
    <>
      <section className="tracking-hero">
        <div className="wide">
          <p className="eyebrow">Acompanhar protocolo</p>
          {searching ? (
            <>
              <h1 className="tracking-search-title">Acompanhar protocolo</h1>
              <p>Digite o número do protocolo e a chave de acesso que estão no seu comprovante.</p>
            </>
          ) : (
            <>
              <div>
                <h1>2026-000123</h1>
                <span className={`status ${waiting ? "waiting" : ""} ${answered ? "answered" : ""}`}>
                  {waiting ? "Aguardando você" : answered ? "Respondida" : "●  Em análise"}
                </span>
              </div>
              <p>Reclamação · Cursos e capacitações · Sebrae/GO</p>
            </>
          )}
        </div>
      </section>
      <main className="wide tracking-grid">
        <aside>
          <section className="side-card">
            <h2>Consultar</h2>
            <label>
              Protocolo
              {searching ? (
                <input key="search-input" placeholder="2026-000000" />
              ) : (
                <input key="filled-input" defaultValue="2026-000123" />
              )}
            </label>
            <small>Exemplo: 2026-000123</small>
            <label>
              Chave de acesso
              <div className="follow-key-field">
                <input type={show ? "text" : "password"} placeholder="XXXX-XXXX-XXXX-XXXX" />
                <button
                  type="button"
                  className="follow-key-toggle"
                  onClick={() => setShow(!show)}
                >
                  {show ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </label>
            <p>
              16 letras e números, como no comprovante. 4 de 5 tentativas restantes. Depois disso, a
              consulta fica bloqueada por 30 minutos.
            </p>
            <button className="button primary full" onClick={() => go("tracking-waiting")}>
              Consultar
            </button>
            <a>Perdi minha chave</a>
          </section>
          {!searching && (
            <>
              <section className="side-card timeline">
                <h2>Andamento</h2>
                {[
                  ["Recebida", "21/10/2026 · 14:32"],
                  ["Em análise", "21/10/2026 · 15:10"],
                  ["Aguardando você", "30/10/2026 · pedido de complemento"],
                  ["Respondida", answered ? "06/11/2026 · 16:05" : "—"],
                ].map(([a, b], i) => (
                  <div
                    className={waiting && i === 2 ? "current" : answered && i === 3 ? "complete" : ""}
                    key={a}
                  >
                    <i style={i === 3 && !answered ? { background: "#fff" } : undefined}></i>
                    <p>
                      <b>{a}</b>
                      <small>{b}</small>
                    </p>
                  </div>
                ))}
              </section>
              <button className="button secondary" onClick={() => go("home")}>
                Sair
              </button>
            </>
          )}
        </aside>
        <div className="tracking-content">
          {searching ? (
            <section className="story how-it-works-card">
              <h2>Como funciona</h2>
              <p>
                Com o protocolo e a chave de acesso você vê em que etapa está a sua manifestação, lê
                a resposta da Ouvidoria e envia informações quando a gente pedir.
              </p>
              <p style={{ marginTop: "12px" }}>
                A chave aparece uma única vez, no comprovante. Se você a perdeu, use “Perdi minha
                chave”.
              </p>
            </section>
          ) : answered ? (
            <>
              <div className="info answered-notice">
                <img src="/assets/info.svg" alt="" />
                Recebemos o seu complemento e a Ouvidoria já respondeu a sua manifestação.
              </div>
              <section className="story answer-card">
                <h2>Resposta da Ouvidoria</h2>
                <p>
                  Olá, Carla. A Unidade de Capacitação do Sebrae/GO confirmou que sua vaga na turma
                  Empretec de 18 a 23/11 foi garantida. O valor não será cobrado de novo e a
                  confirmação foi enviada para o seu e-mail. Pedimos desculpas pela demora no
                  retorno da Central.
                </p>
                <small>Ana Paula Ribeiro · Ouvidoria Sebrae/GO · 06/11/2026</small>
              </section>
              <section className="story answer-card">
                <h2>Como foi o nosso atendimento?</h2>
                <p>
                  Leva 1 minuto. Uma resposta por protocolo. Também aparece aqui para quem não tem
                  e-mail.
                </p>
                <button className="button primary" onClick={() => go("rating")}>
                  Avaliar atendimento
                </button>
              </section>
              <div className="info answered-notice">
                <img src="/assets/info.svg" alt="" />
                <span>
                  Esta manifestação está encerrada e não pode ser reaberta. Se o problema continuar,{" "}
                  <a onClick={() => go("type")}>abra uma nova manifestação (abre em nova aba)</a>{" "}
                  informando o protocolo <b>2026-000123</b>.
                </span>
              </div>
            </>
          ) : waiting ? (
            <section className="reply-card">
              <div className="reply-title">
                <h2>Aguardando você</h2>
                <span>Responda até 10/11/2026</span>
              </div>
              <p className="request">
                <b>A Ouvidoria pediu:</b> “Carla, para localizar sua inscrição, envie o número do
                pedido que aparece no e-mail de confirmação do pagamento e o nome do titular do
                boleto.”
              </p>
              <label>
                Sua resposta
                <textarea defaultValue="O número do pedido é 2026-GO-118743. O boleto está no nome da minha empresa, Mendes Doces Finos ME." />
              </label>
              <div className="reply-actions">
                <a>
                  <img src="/assets/paperclip.svg" alt="" />
                  Anexar arquivo
                </a>
                <button className="button primary" onClick={() => go("tracking-analysis")}>
                  Enviar complemento
                </button>
              </div>
            </section>
          ) : (
            <section className="reply-card">
              <h2>Complemento enviado</h2>
              <p>
                Obrigado, Carla! Recebemos as informações e vamos retomar a análise. Avisaremos por
                e-mail quando houver resposta.
              </p>
              <p>Demonstração: nada foi enviado a nenhum sistema.</p>
            </section>
          )}
          {!answered && (
            <section className="story">
              <h2>Seu relato</h2>
              <p>
                Fiz a inscrição no curso presencial Empretec de Goiânia no dia 02/10, paguei o
                boleto no mesmo dia e até agora não recebi a confirmação da vaga...
              </p>
            </section>
          )}
          {state === "analysis" && (
            <p>
              Exemplo da mesma tela depois da resposta final:{" "}
              <a onClick={() => go("tracking-answered")}>ver protocolo respondido</a>.
            </p>
          )}
        </div>
      </main>
    </>
  );
}

function Rating({ go }: { go: (p: Page) => void }) {
  const [score, setScore] = useState(9);
  const [resolved, setResolved] = useState<"Sim" | "Em parte" | "Não">("Sim");
  const [comment, setComment] = useState(
    "A resposta foi clara e a vaga foi confirmada. Só achei que demorou para a Central dar retorno.",
  );
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="rating-hero">
        <div className="form-width">
          <span className="rating-eyebrow">Pesquisa de satisfação</span>
          <h1>
            Como foi o atendimento do
            <br />
            protocolo <span className="protocol-number">2026-000123</span>?
          </h1>
        </div>
      </section>
      <main className="form-width rating-main">
        <section className="form-card rating-card">
          {sent ? (
            <div className="rating-success" role="status">
              <h2>Avaliação enviada</h2>
              <p>Obrigado por compartilhar sua experiência com a Ouvidoria do Sebrae.</p>
              <div className="button-row">
                <button className="button primary" onClick={() => go("tracking-answered")}>
                  Voltar ao protocolo
                </button>
                <button className="button secondary" onClick={() => go("home")}>
                  Voltar ao início
                </button>
              </div>
            </div>
          ) : (
            <>
              <fieldset>
                <legend>De 0 a 10, quanto você recomendaria a Ouvidoria do Sebrae?</legend>
                <div className="score-grid">
                  {Array.from({ length: 11 }, (_, value) => (
                    <button
                      className={score === value ? "selected" : ""}
                      key={value}
                      type="button"
                      onClick={() => setScore(value)}
                      aria-pressed={score === value}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                <div className="score-labels">
                  <span>Nada provável</span>
                  <span>Muito provável</span>
                </div>
              </fieldset>
              <fieldset>
                <legend>Sua demanda foi resolvida?</legend>
                <div className="resolution-grid">
                  {(["Sim", "Em parte", "Não"] as const).map((option) => (
                    <button
                      className={resolved === option ? "selected" : ""}
                      key={option}
                      type="button"
                      onClick={() => setResolved(option)}
                      aria-pressed={resolved === option}
                    >
                      {option}
                      {resolved === option && <img src="/assets/check-white.svg" alt="" />}
                    </button>
                  ))}
                </div>
              </fieldset>
              <label>
                Comentário <small>(opcional)</small>
                <textarea
                  maxLength={500}
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                />
              </label>
              <p className="character-count">{comment.length} de 500 caracteres</p>
              <p>
                Uma resposta por protocolo. A avaliação fica ligada à manifestação e aparece nos
                relatórios.
              </p>
            </>
          )}
        </section>
        {!sent && (
          <div className="rating-actions">
            <button className="button primary" onClick={() => setSent(true)}>
              Enviar avaliação
            </button>
          </div>
        )}
      </main>
    </>
  );
}

function ComplaintIntro({ go }: { go: (p: Page) => void }) {
  const [anonymousComplaint, setAnonymousComplaint] = useState(true);
  const assurances = [
    {
      icon: "/assets/complaint-shield.svg",
      title: "Não rastreamos você",
      text: "Esta página não grava IP, navegador, cookies de rastreio nem localização. Os registros de rede mascaram o IP.",
    },
    {
      icon: "/assets/complaint-lock.svg",
      title: "Você escolhe se identificar",
      text: "A denúncia pode ser identificada ou anônima. Mesmo anônimo, você conversa com a Comissão pelo protocolo.",
    },
    {
      icon: "/assets/complaint-paperclip.svg",
      title: "Fotos sem metadados",
      text: "Removemos dados de câmera e localização (EXIF) das fotos antes de guardar.",
    },
    {
      icon: "/assets/complaint-info-red.svg",
      title: "O relato não muda",
      text: "Depois de enviada, a denúncia não pode ser editada nem apagada. Você pode enviar complementos.",
    },
  ];

  return (
    <>
      <section className="complaint-hero">
        <div className="form-width">
          <p className="eyebrow">Canal de denúncias</p>
          <h1>Antes de começar: seu sigilo</h1>
        </div>
      </section>
      <main className="form-width complaint-main">
        <div className="complaint-steps">
          {["Sigilo e anonimato", "Relato e evidências", "Envio"].map((step, index) => (
            <div className={index === 0 ? "active" : ""} key={step}>
              <span />
              <p>
                {index + 1}. {step}
              </p>
            </div>
          ))}
        </div>
        <section className="complaint-card">
          <div className="assurance-grid">
            {assurances.map((item) => (
              <article key={item.title}>
                <h2>
                  <img src={item.icon} alt="" />
                  {item.title}
                </h2>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <hr />
          <h2>Como você quer enviar?</h2>
          <p className="choice-subtitle">
            Selecione uma das opções abaixo para definir o nível de identificação do seu relato.
          </p>
          <div className="complaint-options">
            <button
              type="button"
              className={!anonymousComplaint ? "selected" : ""}
              onClick={() => setAnonymousComplaint(false)}
            >
              <div className="option-card-top">
                <div className="option-title-group">
                  <div className="option-icon-badge">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" />
                      <line x1="5" y1="20" x2="19" y2="20" />
                    </svg>
                  </div>
                  <strong>Identificada</strong>
                </div>
                <div className="option-radio-indicator">
                  {!anonymousComplaint && <img src="/assets/check-white.svg" alt="" />}
                </div>
              </div>
              <span>Você informa seus dados para contato. Sua identidade é protegida pela Comissão.</span>
            </button>
            <button
              type="button"
              className={anonymousComplaint ? "selected anonymous-option" : "anonymous-option"}
              onClick={() => setAnonymousComplaint(true)}
            >
              <div className="option-card-top">
                <div className="option-title-group">
                  <div className="option-icon-badge">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <strong>Anônima</strong>
                </div>
                <div className="option-radio-indicator">
                  {anonymousComplaint && <img src="/assets/check-white.svg" alt="" />}
                </div>
              </div>
              <span>Nenhum dado pessoal; acompanho pela chave</span>
            </button>
          </div>
          <p>
            Como tratamos seus dados:{" "}
            <a onClick={() => go("privacy")}>aviso de privacidade do Canal de Denúncias.</a>
          </p>
        </section>
        <div className="complaint-notice">
          <img src="/assets/info.svg" alt="" />
          <span>
            Sua questão é sobre um atendimento, curso ou cobrança?{" "}
            <a onClick={() => go("type")}>Registre na Ouvidoria (abre em nova aba).</a>
          </span>
        </div>
        <div className="form-actions">
          <button className="button complaint-secondary" onClick={() => go("home")}>
            Voltar ao início
          </button>
          <button className="button red" onClick={() => go("complaint-report")}>
            Entendi, continuar
          </button>
        </div>
      </main>
    </>
  );
}

function ComplaintReport({ go }: { go: (p: Page) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState(0);
  const [retaliation, setRetaliation] = useState(false);
  const [people, setPeople] = useState([
    { name: "Marcos A. Ferreira", role: "Gerência ou coordenação", unit: "Sebrae/BA" },
    { name: "", role: "Não sei", unit: "Não sei" },
  ]);
  const [complaintText, setComplaintText] = useState(
    "Desde agosto, as cotações para eventos do Sebrae/BA chegam sempre com as mesmas três empresas e a Alfa Eventos vence todas. Vi mensagens em que o coordenador pede à Alfa para mandar as outras duas propostas com valores maiores. O contrato de setembro foi assinado antes do fim do prazo de cotação.",
  );

  const updatePerson = (index: number, field: "name" | "role" | "unit", value: string) => {
    setPeople((prev) =>
      prev.map((person, i) => (i === index ? { ...person, [field]: value } : person)),
    );
  };

  return (
    <>
      <section className="complaint-hero">
        <div className="form-width">
          <p className="eyebrow">Canal de denúncias</p>
          <h1>Relato da denúncia</h1>
        </div>
      </section>
      <main className="form-width complaint-main">
        <div className="complaint-steps">
          {["Sigilo e anonimato", "Relato e evidências", "Envio"].map((step, index) => (
            <div className={index <= 1 ? "active" : ""} key={step}>
              <span />
              <p style={index === 1 ? { fontFamily: '"Figtree:Bold", Arial, sans-serif' } : undefined}>
                {index + 1}. {step}
                {index === 0 ? " ✓" : ""}
              </p>
            </div>
          ))}
        </div>
        <section className="complaint-card complaint-report-card">
          <div className="two-cols">
            <label>
              Tema <small>(obrigatório)</small>
              <select defaultValue="Licitações, contratos e parcerias">
                <option>Licitações, contratos e parcerias</option>
                <option>Assédio moral ou sexual</option>
                <option>Fraude ou corrupção</option>
                <option>Conflito de interesses</option>
                <option>Outros</option>
              </select>
            </label>
            <label>
              Unidade envolvida <small>(obrigatório)</small>
              <select defaultValue="Sebrae/BA — Unidade de Compras">
                <option>Sebrae/BA — Unidade de Compras</option>
                <option>Sebrae/GO</option>
                <option>Sebrae Nacional</option>
                <option>Não sei informar</option>
              </select>
            </label>
          </div>
          <div className="two-cols">
            <label>
              Quando aconteceu <small>(opcional)</small>
              <input defaultValue="Entre agosto e setembro de 2026" />
            </label>
            <label>
              Onde aconteceu <small>(opcional)</small>
              <input defaultValue="Sede do Sebrae/BA, Salvador" />
            </label>
          </div>

          <div className="people-section">
            <div className="people-header">
              <div className="people-title-group">
                <strong>Pessoas envolvidas</strong>
                <span className="optional-badge">opcional</span>
              </div>
              <span className="people-count">
                {people.length} {people.length === 1 ? "registro" : "registros"}
              </span>
            </div>
            <div className="people-columns-head">
              <span>NOME OU EMPRESA</span>
              <span>CARGO OU NÍVEL</span>
              <span>UNIDADE</span>
              <span>AÇÃO</span>
            </div>
            <div className="people-list">
              {people.map((person, index) => (
                <div className="person-row" key={index}>
                  <input
                    value={person.name}
                    placeholder="Nome ou empresa"
                    onChange={(e) => updatePerson(index, "name", e.target.value)}
                  />
                  <select
                    value={person.role}
                    onChange={(e) => updatePerson(index, "role", e.target.value)}
                  >
                    <option>Gerência ou coordenação</option>
                    <option>Diretoria</option>
                    <option>Colaborador</option>
                    <option>Terceiro ou fornecedor</option>
                    <option>Não sei</option>
                  </select>
                  <select
                    value={person.unit}
                    onChange={(e) => updatePerson(index, "unit", e.target.value)}
                  >
                    <option>Sebrae/BA</option>
                    <option>Sebrae/GO</option>
                    <option>Sebrae Nacional</option>
                    <option>Não sei</option>
                  </select>
                  <button
                    type="button"
                    className="person-delete-btn"
                    title="Remover pessoa"
                    aria-label="Remover pessoa"
                    onClick={() =>
                      setPeople((prev) =>
                        prev.length > 1
                          ? prev.filter((_, i) => i !== index)
                          : [{ name: "", role: "Não sei", unit: "Não sei" }],
                      )
                    }
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="add-person-btn"
              onClick={() =>
                setPeople((prev) => [...prev, { name: "", role: "Não sei", unit: "Não sei" }])
              }
            >
              <span>+</span> Adicionar outra pessoa
            </button>
          </div>

          <label>
            Relato <small>(obrigatório)</small>
            <p className="field-hint">
              Conte o que viu ou soube, com datas e detalhes que ajudem na apuração. Mínimo de 30
              caracteres.
            </p>
            <textarea
              value={complaintText}
              onChange={(e) => setComplaintText(e.target.value)}
            />
          </label>
          <p className="field-hint" style={{ marginTop: "-12px" }}>
            {complaintText.length} caracteres
          </p>

          <div className="complaint-dropzone">
            <p>
              <strong>Evidências</strong> · arraste arquivos ou{" "}
              <a className="complaint-link" onClick={() => fileRef.current?.click()}>
                escolha
              </a>
            </p>
            <input
              ref={fileRef}
              hidden
              type="file"
              multiple
              onChange={(e) => setFiles(e.target.files?.length || 0)}
            />
            <span>
              {files
                ? `${files} arquivo(s) selecionado(s)`
                : "Metadados de fotos são removidos automaticamente. Até 10 arquivos de 10 MB. PDF, JPG, JPEG, PNG, AVI, MP3, MP4 ou OGG."}
            </span>
          </div>

          <div className="retaliation-box">
            <label className="retaliation-check">
              <input
                type="checkbox"
                checked={retaliation}
                onChange={(e) => setRetaliation(e.target.checked)}
              />
              <span>Sofri retaliação por ter feito uma denúncia anterior</span>
            </label>
            <label>
              Protocolo da denúncia original
              <input placeholder="2026-000000" />
            </label>
            <p className="field-hint">
              Aparece quando a opção acima é marcada. O novo caso nasce vinculado ao original, com
              prioridade alta e para a mesma Comissão.
            </p>
          </div>
        </section>

        <div className="form-actions">
          <button className="button complaint-secondary" onClick={() => go("complaint-intro")}>
            Voltar
          </button>
          <button className="button red" onClick={() => go("complaint-receipt")}>
            Enviar denúncia
          </button>
        </div>
      </main>
    </>
  );
}

function ComplaintReceipt({ go }: { go: (p: Page) => void }) {
  const [copied, setCopied] = useState(false);
  const key = "5DTY-JGMR-VTVZ-K973";
  return (
    <>
      <section className="complaint-hero">
        <div className="form-width">
          <p className="eyebrow">Canal de denúncias · Comprovante</p>
          <h1>Denúncia recebida</h1>
        </div>
      </section>
      <main className="form-width complaint-main">
        <section className="complaint-card receipt-card">
          <label>
            Número do protocolo
            <div className="code-box complaint-code-box">2026-144858</div>
          </label>
          <label>
            Chave de acesso
            <div className="code-box complaint-code-box">{key}</div>
          </label>
          <div className="button-row">
            <button
              className="button receipt-action-btn compact"
              onClick={() => {
                navigator.clipboard?.writeText(key);
                setCopied(true);
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              {copied ? "Chave copiada" : "Copiar chave"}
            </button>
            <button className="button receipt-action-btn compact" onClick={() => window.print()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Baixar comprovante
            </button>
          </div>
          <div className="complaint-notice" style={{ marginTop: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span>
              <b>Esta chave aparece só agora e não pode ser recuperada.</b> Como a denúncia é
              anônima, ninguém no Sebrae consegue enviá-la de novo. Anote ou baixe o comprovante.
            </span>
          </div>
          <dl className="complaint-dl">
            <dt>Recebida em</dt>
            <dd>
              <b>13/11/2026 às 18:17</b>
            </dd>
            <dt>Tema</dt>
            <dd>
              <b>Licitações, contratos e parcerias</b>
            </dd>
            <dt>Prazo de apuração</dt>
            <dd>
              <b>até 12/01/2027</b>
            </dd>
          </dl>
          <p className="field-hint">
            Esta é uma demonstração: os dados não foram enviados a nenhum sistema e o protocolo e a
            chave são de exemplo.
          </p>
        </section>
        <div className="form-actions">
          <button className="button complaint-secondary" onClick={() => go("home")}>
            Voltar ao início
          </button>
          <button className="button red" onClick={() => go("complaint-tracking-waiting")}>
            Acompanhar protocolo
          </button>
        </div>
      </main>
    </>
  );
}

function ComplaintTracking({
  go,
  state,
}: {
  go: (p: Page) => void;
  state: "waiting" | "analysis" | "concluded";
}) {
  const [show, setShow] = useState(false);
  const waiting = state === "waiting";
  const concluded = state === "concluded";
  const timelineItems = waiting
    ? [
        ["Recebida", "03/11/2026 · 10:41"],
        ["Em apuração", "03/11/2026 · 11:20"],
        ["Aguardando você", "12/11/2026 · pedido de complemento"],
        ["Concluída", "—"],
      ]
    : [
        ["Recebida", "03/11/2026 · 10:41"],
        ["Em apuração", "03/11/2026 · 11:20"],
        ["Aguardando você", "12/11/2026 · pedido de complemento"],
        ["Em apuração", "Complemento recebido em 13/11/2026 · 18:18"],
        ["Concluída", concluded ? "20/11/2026 · 16:40" : "—"],
      ];

  return (
    <>
      <section className="complaint-hero tracking-hero">
        <div className="wide">
          <p className="eyebrow">Canal de denúncias · Acompanhar protocolo</p>
          <div>
            <h1>2026-000140</h1>
            <span
              className={`status ${waiting ? "waiting" : ""} ${concluded ? "answered" : "complaint-status"}`}
            >
              {waiting ? "Aguardando você" : concluded ? "Concluída" : "●  Em apuração"}
            </span>
          </div>
          <p>Denúncia · Licitações, contratos e parcerias · Sebrae/BA</p>
        </div>
      </section>
      <main className="wide tracking-grid">
        <aside>
          <section className="side-card complaint-side-card">
            <h2 style={{ color: "var(--red)" }}>Consultar</h2>
            <label>
              Protocolo
              <input defaultValue="2026-000140" />
            </label>
            <small>Exemplo: 2026-000123</small>
            <label>
              Chave de acesso
              <div className="follow-key-field">
                <input type={show ? "text" : "password"} placeholder="XXXX-XXXX-XXXX" />
                <button
                  type="button"
                  className="follow-key-toggle"
                  style={{ color: "var(--red)" }}
                  onClick={() => setShow(!show)}
                >
                  {show ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </label>
            <p>
              16 letras e números, como no comprovante. <b>4 de 5</b> tentativas restantes. Depois
              disso, a consulta fica bloqueada por 30 minutos.
            </p>
            <button className="button red full">Consultar</button>
            <a className="complaint-link">Perdi minha chave</a>
          </section>
          <section className="side-card timeline complaint-timeline">
            <h2 style={{ color: "var(--red)" }}>Andamento</h2>
            {timelineItems.map(([title, sub], i) => {
              const isLast = i === timelineItems.length - 1;
              const isCurrent =
                (waiting && i === 2) || (state === "analysis" && i === 3) || (concluded && isLast);
              return (
                <div className={isCurrent ? "current" : ""} key={`${title}-${i}`}>
                  <i
                    style={
                      isLast && !concluded
                        ? { background: "#fff", borderColor: "var(--red)" }
                        : undefined
                    }
                  ></i>
                  <p>
                    <b>{title}</b>
                    <small>{sub}</small>
                  </p>
                </div>
              );
            })}
          </section>
          <button className="button complaint-secondary" onClick={() => go("home")}>
            Sair
          </button>
        </aside>
        <div className="tracking-content">
          {concluded ? (
            <>
              <section className="complaint-card answer-card">
                <h2 style={{ color: "var(--red)" }}>Resultado da apuração</h2>
                <p>
                  A Comissão de Ética concluiu a apuração do protocolo <b>2026-000140</b> e adotou
                  as medidas cabíveis conforme o Código de Ética e as normas internas do Sebrae.
                  Agradecemos a sua contribuição para a integridade institucional.
                </p>
                <small>Comissão de Ética · 20/11/2026</small>
              </section>
              <section className="story answer-card">
                <h2>Como foi o nosso atendimento?</h2>
                <p>
                  Leva 1 minuto. Uma resposta por protocolo. Também aparece aqui para quem não tem
                  e-mail.
                </p>
                <button className="button primary" onClick={() => go("rating")}>
                  Avaliar atendimento
                </button>
              </section>
            </>
          ) : waiting ? (
            <>
              <section className="complaint-card reply-card complaint-reply-card">
                <div className="reply-title">
                  <h2 style={{ color: "var(--red)", margin: 0 }}>Aguardando você</h2>
                  <strong>Responda até 23/11/2026</strong>
                </div>
                <p className="request complaint-request">
                  <b>A Comissão de Ética pediu:</b> “Para avançar na apuração, informe as datas das
                  reuniões de cotação em que você viu essa situação e, se souber, quem mais
                  participou.”
                </p>
                <label>
                  Sua resposta
                  <textarea defaultValue="Foram duas reuniões, nos dias 18 e 25 de setembro, na sala da Unidade de Compras. Estavam presentes a coordenação e três representantes de empresas." />
                </label>
                <div className="reply-actions">
                  <a className="complaint-link">
                    <img src="/assets/complaint-paperclip.svg" alt="" />
                    Anexar arquivo
                  </a>
                  <button
                    className="button red"
                    onClick={() => go("complaint-tracking-analysis")}
                  >
                    Enviar complemento
                  </button>
                </div>
              </section>
              <section className="complaint-card story">
                <h2 style={{ color: "var(--red)" }}>Seu relato</h2>
                <p>
                  Desde agosto, as cotações para eventos do Sebrae/BA chegam sempre com as mesmas
                  três empresas e a Alfa Eventos vence todas...
                </p>
              </section>
              <p>
                Exemplo da mesma tela depois do resultado da apuração:{" "}
                <a className="complaint-link" onClick={() => go("complaint-tracking-concluded")}>
                  ver protocolo concluído
                </a>
                .
              </p>
            </>
          ) : (
            <>
              <section className="complaint-card reply-card complaint-reply-card">
                <h2 style={{ color: "var(--red)", margin: 0 }}>Complemento enviado</h2>
                <p>
                  Obrigado! Recebemos as informações e vamos retomar a apuração. A Comissão responde
                  por aqui, com sigilo.
                </p>
                <p className="field-hint">Demonstração: nada foi enviado a nenhum sistema.</p>
              </section>
              <section className="story answer-card">
                <h2>Como foi o nosso atendimento?</h2>
                <p>
                  Leva 1 minuto. Uma resposta por protocolo. Também aparece aqui para quem não tem
                  e-mail.
                </p>
                <button className="button primary" onClick={() => go("rating")}>
                  Avaliar atendimento
                </button>
              </section>
              <p>
                Exemplo da mesma tela depois do resultado da apuração:{" "}
                <a className="complaint-link" onClick={() => go("complaint-tracking-concluded")}>
                  ver protocolo concluído
                </a>
                .
              </p>
            </>
          )}
        </div>
      </main>
    </>
  );
}

function PrivacyPage({ go }: { go: (p: Page) => void }) {
  const [tab, setTab] = useState<"ouvidoria" | "denuncias">("ouvidoria");
  const [reqType, setReqType] = useState<"Acesso" | "Correção" | "Eliminação">("Acesso");
  const [sent, setSent] = useState(false);

  const requestOptions: Array<[typeof reqType, string]> = [
    ["Acesso", "Saber quais dados temos sobre você"],
    ["Correção", "Corrigir dado incompleto ou errado"],
    ["Eliminação", "Apagar o que não precisa ser guardado"],
  ];

  return (
    <>
      <section className={tab === "denuncias" ? "complaint-hero" : "form-hero"}>
        <div className="form-width">
          <p className="eyebrow">
            {tab === "denuncias" ? "Canal de denúncias · LGPD" : "Ouvidoria · LGPD"}
          </p>
          <h1>Privacidade e direitos do titular</h1>
          <p>
            {tab === "denuncias"
              ? "Aviso de privacidade do Canal de Denúncias · versão de 10/11/2026"
              : "Aviso de privacidade da Ouvidoria · versão de 10/11/2026"}
          </p>
        </div>
      </section>
      <main className="form-width privacy-main">
        <div className="privacy-tabs">
          <button
            type="button"
            className={tab === "ouvidoria" ? "active" : ""}
            onClick={() => setTab("ouvidoria")}
          >
            Aviso da Ouvidoria
          </button>
          <button
            type="button"
            className={tab === "denuncias" ? "active denuncias-tab" : "denuncias-tab"}
            onClick={() => setTab("denuncias")}
          >
            Aviso do Canal de Denúncias
          </button>
        </div>

        <section className="form-card privacy-info-card">
          <h2 style={tab === "denuncias" ? { color: "var(--red)" } : undefined}>
            Como tratamos seus dados
          </h2>
          {tab === "ouvidoria" ? (
            <dl className="privacy-dl">
              <dt>Controlador</dt>
              <dd>
                <b>Sebrae — Serviço Brasileiro de Apoio às Micro e Pequenas Empresas</b>
              </dd>
              <dt>Finalidade</dt>
              <dd>
                <b>Receber, tratar e responder sua manifestação e medir a satisfação</b>
              </dd>
              <dt>Compartilhamento</dt>
              <dd>
                <b>
                  Só com a área do Sebrae que precisa responder; nunca para marketing de terceiros
                </b>
              </dd>
              <dt>Contato</dt>
              <dd>
                <b>Só se você autorizar; dá para revogar a qualquer momento</b>
              </dd>
              <dt>Guarda</dt>
              <dd>
                <b>60 meses após o encerramento; depois, anonimização</b>
              </dd>
              <dt>Encarregado (DPO)</dt>
              <dd>
                <b>encarregado@sebrae.com.br</b>
              </dd>
            </dl>
          ) : (
            <dl className="privacy-dl">
              <dt>Controlador</dt>
              <dd>
                <b>Sebrae — Serviço Brasileiro de Apoio às Micro e Pequenas Empresas</b>
              </dd>
              <dt>Finalidade</dt>
              <dd>
                <b>Receber e apurar relatos de violação ao Código de Ética com sigilo</b>
              </dd>
              <dt>Compartilhamento</dt>
              <dd>
                <b>
                  Restrito exclusivamente à Comissão de Ética e investigadores sem conflito de
                  interesse
                </b>
              </dd>
              <dt>Rastreamento</dt>
              <dd>
                <b>Não gravamos IP, navegador, cookies de rastreio nem metadados (EXIF) de fotos</b>
              </dd>
              <dt>Guarda</dt>
              <dd>
                <b>60 meses após a conclusão da apuração; depois, anonimização</b>
              </dd>
              <dt>Encarregado (DPO)</dt>
              <dd>
                <b>encarregado@sebrae.com.br</b>
              </dd>
            </dl>
          )}
        </section>

        <section className="form-card privacy-request-card">
          {sent ? (
            <div className="rating-success" style={{ padding: "8px 0" }}>
              <h2>Pedido registrado</h2>
              <p>
                Recebemos a sua solicitação de <b>{reqType.toLowerCase()}</b> como titular dos
                dados. O nosso Encarregado (DPO) responderá pelo e-mail informado dentro do prazo
                legal da LGPD.
              </p>
              <div className="button-row" style={{ marginTop: "8px" }}>
                <button className="button primary" onClick={() => setSent(false)}>
                  Novo pedido
                </button>
                <button className="button secondary" onClick={() => go("home")}>
                  Voltar ao início
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2>Fazer um pedido como titular dos dados</h2>
              <div className="privacy-type-grid">
                {requestOptions.map(([title, desc]) => (
                  <button
                    key={title}
                    type="button"
                    className={reqType === title ? "selected" : ""}
                    onClick={() => setReqType(title)}
                  >
                    <strong>{title}</strong>
                    <span>{desc}</span>
                  </button>
                ))}
              </div>
              <div className="two-cols">
                <label>
                  Nome completo <span className="req-star">*</span>
                  <input defaultValue="Carla Mendes de Souza" />
                </label>
                <label>
                  CPF <span className="req-star">*</span>
                  <input defaultValue="048.482.917-30" />
                </label>
              </div>
              <div className="two-cols">
                <label>
                  E-mail <span className="req-star">*</span>
                  <input type="email" defaultValue="carla.mendes@gmail.com" />
                </label>
                <label>
                  Protocolo relacionado <small>(opcional)</small>
                  <input defaultValue="2026-000123" />
                </label>
              </div>
              <label>
                Detalhe do pedido
                <textarea defaultValue="Quero saber quais dados pessoais meus estão guardados na manifestação 2026-000123 e por quanto tempo." />
              </label>
              <div className="privacy-actions">
                <button className="button secondary" onClick={() => go("home")}>
                  Voltar
                </button>
                <button className="button primary" onClick={() => setSent(true)}>
                  Enviar pedido
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}

function InternalPanel({ go }: { go: (p: Page) => void }) {
  const [activeMenu, setActiveMenu] = useState("Triagem");
  const [unit, setUnit] = useState("Sebrae/GO");
  const [searchQuery, setSearchQuery] = useState("");

  const menuGroups: Array<{
    section: string;
    items: Array<{ label: string; badge?: number }>;
  }> = [
    {
      section: "OUVIDORIA",
      items: [
        { label: "Triagem", badge: 12 },
        { label: "Caixa de entrada", badge: 18 },
        { label: "Registrar atendimento" },
        { label: "Melhorias" },
      ],
    },
    {
      section: "RELATÓRIOS",
      items: [{ label: "Dashboards" }, { label: "Relatórios" }, { label: "Exportação" }],
    },
    {
      section: "AUDITORIA",
      items: [{ label: "Anexos bloqueados" }],
    },
    {
      section: "AJUDA",
      items: [{ label: "Central de ajuda" }],
    },
  ];

  return (
    <div className="internal-layout">
      <aside className="internal-sidebar">
        <div className="internal-brand-wrap">
          <button type="button" className="internal-logo-box" onClick={() => go("home")}>
            LOGO DA EMPRESA
          </button>
          <p className="internal-brand-sub">Ouvidoria e Canal de Denúncias</p>
        </div>

        <nav className="internal-nav" aria-label="Menu principal interno">
          {menuGroups.map((group) => (
            <div className="internal-nav-group" key={group.section}>
              <span className="internal-nav-section">{group.section}</span>
              {group.items.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={
                    activeMenu === item.label ? "internal-nav-item active" : "internal-nav-item"
                  }
                  onClick={() => setActiveMenu(item.label)}
                >
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="internal-nav-badge">{item.badge}</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="internal-sidebar-footer">
          <p>
            Ver como: <b>Ana Paula Ribeiro</b>
          </p>
          <span>Operadora · Ouvidoria {unit}</span>
          <button
            type="button"
            className="internal-portal-switch"
            onClick={() => go("home")}
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
                <option>Sebrae/GO</option>
                <option>Sebrae Nacional</option>
                <option>Sebrae/BA</option>
                <option>Sebrae/SP</option>
              </select>
            </label>
            <div className="internal-search-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              onClick={() => setActiveMenu("Central de ajuda")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </button>
          </div>

          <div className="internal-user-info">
            <strong>Ana Paula Ribeiro</strong>
            <span>Operadora · Ouvidoria {unit}</span>
          </div>
        </header>

        <main className="internal-workspace">
          {/* Espaço da tela interna selecionada */}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("login");
  const [scale, setScale] = useState(1);
  const [contrast, setContrast] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [report, setReport] = useState("");
  const go = (next: Page) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const login = page === "login" || page === "create-password";
  const isInternal = page === "internal";
  const isComplaintPage = page.startsWith("complaint-");
  return (
    <div className={contrast ? "app high-contrast" : "app"} style={{ fontSize: `${scale}em` }}>
      {!isInternal && (
        <Accessibility
          scale={scale}
          setScale={setScale}
          contrast={contrast}
          setContrast={setContrast}
        />
      )}
      {!login && !isInternal && <Header go={go} complaint={isComplaintPage} />}
      {page === "login" && <Login go={go} />}
      {page === "create-password" && <CreatePassword go={go} />}
      {page === "home" && <Home go={go} />}
      {page === "privacy" && <PrivacyPage go={go} />}
      {page === "internal" && <InternalPanel go={go} />}
      {page === "type" && <TypeStep go={go} />}
      {page === "identity" && (
        <IdentityStep go={go} anonymous={anonymous} setAnonymous={setAnonymous} />
      )}
      {page === "report" && <ReportStep go={go} report={report} setReport={setReport} />}
      {page === "review" && <ReviewStep go={go} report={report} />}
      {page === "receipt" && <Receipt go={go} />}
      {page === "tracking-search" && <Tracking go={go} state="search" />}
      {page === "tracking-waiting" && <Tracking go={go} state="waiting" />}
      {page === "tracking-analysis" && <Tracking go={go} state="analysis" />}
      {page === "tracking-answered" && <Tracking go={go} state="answered" />}
      {page === "rating" && <Rating go={go} />}
      {page === "complaint-intro" && <ComplaintIntro go={go} />}
      {page === "complaint-report" && <ComplaintReport go={go} />}
      {page === "complaint-receipt" && <ComplaintReceipt go={go} />}
      {page === "complaint-tracking-waiting" && <ComplaintTracking go={go} state="waiting" />}
      {page === "complaint-tracking-analysis" && <ComplaintTracking go={go} state="analysis" />}
      {page === "complaint-tracking-concluded" && <ComplaintTracking go={go} state="concluded" />}
      {!isInternal && <Footer go={go} login={login} />}
    </div>
  );
}
