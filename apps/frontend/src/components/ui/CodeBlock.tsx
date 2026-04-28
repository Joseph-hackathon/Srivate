import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, language = 'typescript', title, showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast({
      title: 'Copied to clipboard',
      description: 'Code has been copied to your clipboard.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className="rounded-xl border border-white/5 bg-[#0F0F1A] overflow-hidden shadow-2xl">
      {title && (
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/5 bg-white/[0.02]">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">{title}</span>
          <span className="text-[10px] font-bold text-white/10 uppercase tracking-widest">{language}</span>
        </div>
      )}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-8 w-8 text-white/20 hover:text-white hover:bg-white/5 transition-all"
          onClick={handleCopy}
        >
          {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
        </Button>
        <pre className="p-6 overflow-x-auto">
          <code className="text-sm font-mono text-white/70 leading-relaxed">
            {showLineNumbers ? (
              lines.map((line, index) => (
                <div key={index} className="flex">
                  <span className="text-white/10 mr-6 select-none w-6 text-right font-bold">
                    {index + 1}
                  </span>
                  <span>{line}</span>
                </div>
              ))
            ) : (
              code
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}
