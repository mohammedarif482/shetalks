import React from "react";
import "./index.css";

const AvatarStack: React.FC = () => {
  const avatars = [
    { src: "/avatar1.svg", alt: "Avatar 1" },
    { src: "/avatar2.svg", alt: "Avatar 2" },
    { src: "/avatar3.svg", alt: "Avatar 3" },
    { src: "/avatar4.svg", alt: "Avatar 4" },
  ];
  return (
    <div className="pill flex items-center gap-3 w-[421px] h-[72px]">
      <div className="flex -space-x-3">
        {avatars.map((a, i) => (
          <img key={i} src={a.src} alt={a.alt} className="h-11 w-11 rounded-full object-cover" />
        ))}
      </div>
      <p className="text-sm max-w-[242px]">Lorem ipsum dolor sit amet sed do eiusmod tempor</p>
    </div>
  );
};

const CTAButton: React.FC = () => (
  <a href="#join" className="pill inline-flex items-center justify-center h-[52px] w-[254px]">
    <span className="text-primary text-lg">Join The She Talks</span>
  </a>
);

const Header: React.FC = () => (
  <header className="container mx-auto flex items-center justify-between pt-6">
    <div className="w-[107px] h-[110px] text-primary">
      <div className="w-full h-full bg-primary/10 rounded" />
    </div>
    <nav className="hidden md:flex items-center gap-8 text-[32px] leading-8">
      <a className="hover:opacity-80" href="#community">Community</a>
      <a className="hover:opacity-80" href="#events">Events</a>
      <a className="hover:opacity-80" href="#launches">Launches</a>
    </nav>
    <div className="hidden md:block">
      <CTAButton />
    </div>
  </header>
);

const FeatureCard: React.FC<{ title: string; body: string; variant?: "filled" | "outline"; }> = ({ title, body, variant = "filled" }) => {
  const base = "rounded-pill w-[390px] h-[223px] p-6";
  if (variant === "filled") {
    return (
      <div className={`${base} bg-primary text-background`}>
        <h3 className="text-[48px] font-medium">{title}</h3>
        <p className="mt-2 max-w-[345px]">{body}</p>
      </div>
    );
  }
  return (
    <div className={`${base} bg-transparent border-2 border-primary text-text`}>
      <h3 className="text-[48px] text-primary font-medium">{title}</h3>
      <p className="mt-2 max-w-[345px]">{body}</p>
    </div>
  );
};

const Hero: React.FC = () => (
  <section className="container mx-auto mt-16 grid grid-cols-1 lg:grid-cols-[1fr_334px] gap-10">
    <div>
      <AvatarStack />
      <h1 className="heading-primary mt-6 whitespace-pre-line text-[96px] leading-[75px] md:leading-[75px]">
        {"Let's Talk.
Heal Together.
Rise Fearlessly."}
      </h1>
      <p className="mt-6 max-w-[707px] text-base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.
      </p>
    </div>
    <div className="justify-self-end">
      <img src="/hero.svg" alt="Hero" className="w-[334px] h-[624px] object-cover" />
    </div>
  </section>
);

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <section className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 pb-16">
        <FeatureCard
          title="Community"
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          variant="filled"
        />
        <FeatureCard
          title="Events"
          body="Ut enim ad minim veniam. consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua."
          variant="outline"
        />
        <FeatureCard
          title="Launches"
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          variant="outline"
        />
      </section>
    </div>
  );
}

export default App;
