'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import './LoveToggle.css';

export default function Interruptor() {
  const [isChecked, setIsChecked] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Atualiza o estado inicial com base na rota atual
  useEffect(() => {
    if (pathname.includes('/nursePage/researcherPage')) {
      setIsChecked(false);
    } else if (pathname.includes('/nursePage')) {
      setIsChecked(true);
    }
  }, [pathname]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);

    // Aguarda 1s antes de redirecionar
    setTimeout(() => {
      if (!checked && pathname.includes('/nursePage')) {
        router.push('/nursePage/researcherPage');
      } else if (checked && pathname.includes('/nursePage/researcherPage')) {
        router.push('/nursePage');
      }
    }, 1000);
  };

  return (
    <div className="love mt-2 scale-[0.8]">
      <input id="switch" type="checkbox" checked={isChecked} onChange={handleChange} />
      <label className="love-heart" htmlFor="switch">
        <i className="left"></i>
        <i className="right"></i>
        <i className="bottom"></i>
        <div className="round"></div>
      </label>
    </div>
  );
}
