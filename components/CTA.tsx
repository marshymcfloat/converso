import Image from "next/image";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-badge">Start learning your way.</div>
      <h1>Build a Personalize Learning Companion</h1>
      <p>
        Pick a name, subject, voice, & personality — and start learning through
        voice conversations that feel natural and fun.
      </p>
      <Image src={"/images/cta.svg"} width={362} height={232} alt="cta image" />
      <button className="btn-primary">
        <Link href={`/companions/new`} className="flex gap-2">
          <Image src={"/icons/plus.svg"} alt="plus" width={15} height={15} />
          <p>Build new companion</p>
        </Link>
      </button>
    </section>
  );
};

export default CTA;
