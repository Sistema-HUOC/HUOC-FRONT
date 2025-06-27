'use client';
import { Suspense } from 'react';
import ClinicalFormContent from './ClinicalFormContent';

export default function ClinicalFormPage() {
  return (
    <Suspense fallback={<div>Carregando formulário...</div>}>
      <ClinicalFormContent />
    </Suspense>
  );
}
