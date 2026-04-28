import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/landing/HeroSection';
import { UberUseCase } from '@/components/landing/UberUseCase';
import { DemoWidget } from '@/components/landing/DemoWidget';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { UsingSrivateSection } from '@/components/landing/UsingSrivateSection';
import { ArchitectureSection } from '@/components/landing/ArchitectureSection';

const Index = () => {
  return (
    <Layout>
      <div className="bg-space-gradient min-h-screen">
        <HeroSection />
        <UberUseCase />
        <ArchitectureSection />
        <FeaturesSection />
        <UsingSrivateSection />
      </div>
    </Layout>
  );
};

export default Index;
