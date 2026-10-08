import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { getAccessToken, googleSignIn, initAuth } from '../lib/firebase';
import { fetchWorkspaceFiles, DriveFile } from '../lib/drive';

export function Lab() {
  const [needsAuth, setNeedsAuth] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (_, token) => {
        setNeedsAuth(false);
        loadFiles();
      },
      () => setNeedsAuth(true)
    );
    return () => unsubscribe();
  }, []);

  const loadFiles = async () => {
    setLoadingFiles(true);
    try {
      const data = await fetchWorkspaceFiles();
      setFiles(data);
    } catch (error) {
      console.error('Failed to load files:', error);
      setNeedsAuth(true);
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setNeedsAuth(false);
        loadFiles();
      }
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const researchLogs = [
    {
      id: 'R01',
      title: 'Multi-Market Signal Frameworks',
      status: 'ACTIVE',
      desc: 'Extending the Ogwulimted FX signal bot architecture to correlate forex and indices. Focus on volatility contraction patterns.',
    },
    {
      id: 'R02',
      title: 'AI Training Data Pipelines',
      status: 'BUILDING',
      desc: 'Developing specialized instruction sets and RLHF pipelines for fine-tuning visual generation models.',
    },
    {
      id: 'R03',
      title: 'Spatial Data Intelligence',
      status: 'CONCEPT',
      desc: 'Combining parametric architectural constraints with machine learning to optimize high-density floor plan generation.',
    }
  ];

  return (
    <section id="lab" className="py-20 relative px-8 md:px-16 lg:px-24 xl:px-32 bg-[#F1F3F4] dark:bg-[#242424] rounded-[32px] overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl"
      >
        <div className="mb-16">
          <h2 className="text-2xl font-light text-[#202124] dark:text-[#E8EAED] mb-2 font-display">The Lab</h2>
          <p className="text-sm font-mono text-[#5F6368] dark:text-[#9AA0A6]">Active Research</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Research Logs - takes up 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-xs font-mono tracking-widest text-[#5F6368] dark:text-[#9AA0A6] mb-6 border-b border-[#DADCE0] dark:border-[#3C4043] pb-2 uppercase font-bold">Research Logs</h3>
            {researchLogs.map((log, i) => (
              <motion.div 
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="flex flex-col md:flex-row gap-6 group"
              >
                <div className="md:w-32 shrink-0 pt-1">
                  <span className={`text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-sm uppercase text-white font-bold ${
                    log.status === 'ACTIVE' ? 'bg-[#34A853]' 
                    : log.status === 'BUILDING' ? 'bg-[#FBBC05]'
                    : 'bg-[#4285F4]'
                  }`}>
                    {log.status}
                  </span>
                </div>
                <div className="flex-1 pb-8 border-b border-[#DADCE0] dark:border-[#3C4043] group-last:border-0 group-last:pb-0">
                  <h4 className="text-base font-medium text-[#202124] dark:text-[#E8EAED] mb-2 font-display">{log.title}</h4>
                  <p className="text-sm text-[#5F6368] dark:text-[#9AA0A6] leading-relaxed max-w-lg">{log.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Workspace Sync - takes up 1 column */}
          <div className="bg-white dark:bg-[#121212] border border-[#DADCE0] dark:border-[#3C4043] p-6 md:p-8 h-fit lg:sticky lg:top-24 rounded-lg">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xs font-mono tracking-widest text-[#202124] dark:text-[#E8EAED] uppercase font-bold">Google Drive Integration</h3>
              <div className={`w-2 h-2 rounded-full ${needsAuth ? 'bg-[#EA4335]' : 'bg-[#34A853]'} animate-pulse`} />
            </div>

            {needsAuth ? (
              <div className="flex flex-col items-start gap-6">
                <p className="text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6] leading-relaxed">
                  Connect your Google Drive to view shared workspace files.
                </p>
                <button 
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="w-full flex items-center justify-center gap-2 bg-[#4285F4] text-white px-4 py-3 font-mono text-xs tracking-widest uppercase hover:bg-[#1A73E8] transition-colors disabled:opacity-50 rounded-sm"
                >
                  {isLoggingIn ? 'Connecting...' : 'Connect Google Drive'}
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <p className="text-[10px] font-mono text-[#137333] dark:text-[#81C995] tracking-widest uppercase">Drive Connected</p>
                </div>
                
                {loadingFiles ? (
                  <p className="text-xs font-mono text-[#5F6368] dark:text-[#9AA0A6] animate-pulse tracking-widest uppercase">Loading files...</p>
                ) : (
                  <div className="space-y-4">
                    {files.length === 0 && <p className="text-[11px] font-mono text-[#5F6368] dark:text-[#9AA0A6]">No active files found.</p>}
                    {files.map(file => (
                      <div key={file.id} className="flex flex-col border-l-2 border-[#DADCE0] dark:border-[#3C4043] pl-3 py-1 group hover:border-[#4285F4] transition-colors">
                        <span className="text-xs font-mono text-[#202124] dark:text-[#E8EAED] truncate block group-hover:text-[#4285F4] transition-colors" title={file.name}>{file.name}</span>
                        <span className="text-[9px] font-mono text-[#80868B] dark:text-[#9AA0A6] mt-1 tracking-widest">{new Date(file.modifiedTime).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </motion.div>
    </section>
  );
}
