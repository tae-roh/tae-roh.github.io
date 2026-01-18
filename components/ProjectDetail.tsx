
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const ProjectDetail: React.FC = () => {

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-900 flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <header className="mb-16">
          <h1 className="text-3xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-6">
            EAIN: Element-wise Action Importance Estimation for Adaptive Exploration in High-Dimensional Action Spaces
          </h1>
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            <span className="font-bold text-gray-900">Keywords:</span>
            <span>Reinforcement Learning</span>
            <span className="text-gray-300">|</span>
            <span>Maximum Entropy RL</span>
            <span className="text-gray-300">|</span>
            <span>Exploration</span>
            <span className="text-gray-300">|</span>
            <span>Reproducibility</span>
          </div>
        </header>

        {/* Motivation Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-100">💡 Motivation</h2>
          <p className="text-gray-700 leading-relaxed">
            The importance of each action dimension can vary depending on the current state. Excessive exploration in action dimensions that are less important at a given state can be inefficient and unnecessary.
          </p>
          <div className="flex flex-col items-center mb-10">
            <img 
              src="https://github.com/user-attachments/assets/5c87f0d9-bc55-4129-8b07-c7e7b0dc1a1b" 
              alt="Varying Joint Importance Across States" 
              className="max-w-full rounded-lg shadow-sm border border-gray-100"
            />
            <p className="mt-4 italic text-gray-500 text-sm">Varying Joint Importance Across States</p>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Consider a 6-DoF robot arm with a gripper. At the start of a grasping task — when the gripper is distant from the object — excessive exploration of wrist and gripper joints can be unnecessary or even harmful, while base joints may matter more for reachability. As the dimensionality increases, this inefficiency becomes more pronounced.
          </p>
          <p className="mt-6 text-gray-700 leading-relaxed">
            These observations motivate an approach that allocates exploration according to the state-dependent importance of each action dimension, rather than applying uniform exploration across all dimensions.
          </p>
        </section>

        {/* Overview Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-100">🤖 Overview</h2>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              Exploration in high-dimensional reinforcement learning is fundamentally challenging, as the agent must navigate a complex action space. Although maximum entropy RL mitigates some of these difficulties by providing a principled mechanism for encouraging broad and consistent exploration, it can still cause misaligned or overly diffuse exploration behaviors in complex control tasks, sometimes leading to unstable policy updates and suboptimal learning dynamics (Zhang et al., 2025). This study argues that such instability arises because standard entropy regularization treats all action dimensions identically, injecting unnecessary randomness into dimensions that do not contribute meaningfully to policy improvement.
            </p>
            <p>
              To address this, this study introduces an auxiliary <span className="font-bold text-gray-900">Element-wise Action Importance Network (EAIN)</span> that estimates the state-dependent importance of each action dimension. These importance values are used to apply dimension-wise weighting exclusively to the entropy term of the policy objective, allowing adaptive exploration to focus on reward-relevant dimensions while suppressing extraneous entropy from less influential ones.
            </p>
            <p>
              Experiments on the high-dimensional Humanoid-v5 benchmark demonstrate that this method significantly reduces variance in evaluation returns. 
              In 2M-step experiments, with fixed α, it achieves up to a <span className="font-bold text-gray-900">36%</span> reduction in average standard deviation across 7 seeds and a <span className="font-bold text-gray-900">37%</span> reduction over the last 500k steps compared to baseline SAC. 
              With auto-tuned α, the method similarly yields notable improvements, reducing overall standard deviation by <span className="font-bold text-gray-900">18%</span> and last-500k standard deviation by <span className="font-bold text-gray-900">35%</span>. 
              A longer 5M-step experiment with 5 seeds under auto-tuned α shows consistent variance-reduction effects: the overall standard deviation across training decreases by <span className="font-bold text-gray-900">27.4%</span>, and the last-1M-step standard deviation decreases by <span className="font-bold text-gray-900">50.1%</span>.
            </p>
            <p>
            These findings highlight the effectiveness of dimension-wise entropy weighting in stabilizing policy learning in complex, high-dimensional action spaces, ultimately improving the reproducibility of maximum entropy RL training outcomes.
            </p>
          </div>
        </section>

        {/* Approach Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-100">🔎 Approach</h2>
          <div className="flex flex-col items-center mb-12">
            <img 
              src="https://github.com/user-attachments/assets/90262577-5530-43da-b29b-a4aee56ddb03" 
              alt="Overview of SAC with EAIN" 
              className="max-w-full rounded-lg shadow-sm"
            />
            <p className="mt-4 italic text-gray-500 text-sm">Overview of SAC with EAIN</p>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">1. Problem Formulation</h3>
              <p className="mb-4">Soft Actor-Critic (SAC) optimizes a stochastic policy <span className="font-serif italic text-blue-700">π<sub>θ</sub>(a | s)</span> with entropy regularization:</p>
              <div className="bg-gray-50 py-4 px-6 rounded-xl font-mono text-center overflow-x-auto">
                J(π<sub>θ</sub>) = 𝔼<sub>s~D, a~π<sub>θ</sub></sub> [ Q<sub>ψ</sub>(s,a) - α log π<sub>θ</sub>(a | s) ]
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">2. Dimension-wise Entropy Weighting</h3>
              <p className="mb-4">A dimension-wise importance vector <span className="font-serif font-bold italic text-blue-700">ŵ ∈ ℝ<sup>d</sup></span> is introduced:</p>
              <div className="bg-gray-50 py-4 px-6 rounded-xl font-mono text-center overflow-x-auto">
                J(π<sub>θ</sub>) = 𝔼<sub>s~D, a~π<sub>θ</sub></sub> [ Q<sub>ψ</sub>(s,a) - α Σ<sub>i=1..d</sub> ŵ<sub>i</sub>(s) log π<sub>θ</sub>(a<sub>i</sub> | s) ]
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">3. Element-wise Action Importance (EAI) Network</h3>
              <p className="mb-4">Importance weights are predicted by an auxiliary network:</p>
              <div className="bg-gray-50 py-4 px-6 rounded-xl font-mono text-center">
                ŵ = f<sub>ϕ</sub>(s),  ŵ ∈ ℝ<sup>d</sup>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-6 text-gray-800">4. Training Objectives</h3>
              <ul className="space-y-6">
                <li>
                  <span className="font-bold text-gray-900">Policy Loss:</span> Updates policy parameters <span className="italic">θ</span> using the entropy-weighted objective, while detaching the EAI network's outputs.
                </li>
                <li>
                  <span className="font-bold text-gray-900">Critic Loss:</span> Standard Bellman error updates as in standard SAC.
                </li>
                <li>
                  <span className="font-bold text-gray-900">EAI Loss:</span> Trained with regression against a proxy signal derived from the action-gradient of the Q-function:
                  <div className="bg-gray-50 py-4 px-6 rounded-xl font-mono text-center">
                    w<sub>i</sub>(s) ∝ | ∂Q<sub>ψ</sub>(s,a) / ∂a<sub>i</sub> |
                  </div>
                </li>
              </ul>
          </div>
        </section>

        {/* Experiments Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-gray-100">📉 Experiments</h2>
          
          {/* Result 1 */}
          <div className="mb-16">
            <h3 className="text-xl font-bold mb-4">Result 1 (2M steps; 7 seeds)</h3>
            <img 
              src="https://github.com/user-attachments/assets/dbd9f4f6-9a36-4055-9677-b77e10cda8f0" 
              alt="Learning Curves Result 1" 
              className="w-full h-auto mb-8 rounded-lg shadow-md"
            />
            
            <div className="space-y-6">
              <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 font-bold text-gray-900">Fixed α Setting</th>
                      <th className="px-6 py-4 font-bold text-gray-900">Final Return (mean ± s.d.)</th>
                      <th className="px-6 py-4 font-bold text-gray-900">Overall Avg s.d.</th>
                      <th className="px-6 py-4 font-bold text-gray-900">Last 500K s.d.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-6 py-4 font-medium">SAC (Baseline)</td>
                      <td className="px-6 py-4">5361.6 ± 295.9</td>
                      <td className="px-6 py-4">824.4</td>
                      <td className="px-6 py-4">678.3</td>
                    </tr>
                    <tr className="bg-blue-50/30">
                      <td className="px-6 py-4 font-bold text-blue-700">SAC + EAIN</td>
                      <td className="px-6 py-4">5242.1 <span className="text-red-500 font-medium">(-2.2%)</span> ± 137.0 <span className="text-green-600 font-bold">(-53.7%)</span></td>
                      <td className="px-6 py-4 text-green-600 font-bold">527.6 (-36.0%)</td>
                      <td className="px-6 py-4 text-green-600 font-bold">428.4 (-36.8%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 font-bold text-gray-900">Auto-tuned α Setting</th>
                      <th className="px-6 py-4 font-bold text-gray-900">Final Return (mean ± s.d.)</th>
                      <th className="px-6 py-4 font-bold text-gray-900">Overall Avg s.d.</th>
                      <th className="px-6 py-4 font-bold text-gray-900">Last 500K s.d.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-6 py-4 font-medium">SAC (Baseline)</td>
                      <td className="px-6 py-4">4933.2 ± 457.6</td>
                      <td className="px-6 py-4">525.6</td>
                      <td className="px-6 py-4">519.1</td>
                    </tr>
                    <tr className="bg-blue-50/30">
                      <td className="px-6 py-4 font-bold text-blue-700">SAC + EAIN</td>
                      <td className="px-6 py-4">5165.1 <span className="text-green-600 font-bold">(+4.7%)</span> ± 263.8 <span className="text-green-600 font-bold">(-42.3%)</span></td>
                      <td className="px-6 py-4 text-green-600 font-bold">431.4 (-17.9%)</td>
                      <td className="px-6 py-4 text-green-600 font-bold">335.7 (-35.3%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className="mt-6 text-gray-600 text-sm italic border-l-2 border-gray-200 pl-4">
              ✅ <strong>Analysis:</strong> Across both α settings, EAIN consistently reduces seed-to-seed variance, leading to improved reproducibility. It stabilizes performance in later stages significantly better than baseline SAC.
            </p>
          </div>

          {/* Result 2 */}
          <div className="mb-16">
            <h3 className="text-xl font-bold mb-4">Result 2 (5M steps; 5 seeds; auto-tuned α)</h3>
            <img 
              src="https://github.com/user-attachments/assets/8ae32bbe-546e-4b77-9fb0-128c0e99cea3" 
              alt="Learning Curves Result 2" 
              className="w-full h-auto mb-8 rounded-lg shadow-md"
            />
            <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl mb-6">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 font-bold text-gray-900">Auto-tuned α</th>
                    <th className="px-6 py-4 font-bold text-gray-900">Final Return (mean ± s.d.)</th>
                    <th className="px-6 py-4 font-bold text-gray-900">Overall Avg s.d.</th>
                    <th className="px-6 py-4 font-bold text-gray-900">Last 1M steps s.d.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-6 py-4 font-medium">SAC (Baseline)</td>
                    <td className="px-6 py-4">5774.3 ± 467.2</td>
                    <td className="px-6 py-4">503.0</td>
                    <td className="px-6 py-4">508.2</td>
                  </tr>
                  <tr className="bg-blue-50/30">
                    <td className="px-6 py-4 font-bold text-blue-700">SAC + EAIN</td>
                    <td className="px-6 py-4">5410.4 <span className="text-red-500 font-medium">(-6.3%)</span> ± 128.0 <span className="text-green-600 font-bold">(-72.6%)</span></td>
                    <td className="px-6 py-4 text-green-600 font-bold">365.2 (-27.4%)</td>
                    <td className="px-6 py-4 text-green-600 font-bold">253.7 (-50.1%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 text-sm italic border-l-2 border-gray-200 pl-4">
              ✅ <strong>Analysis:</strong> In the longer 5M-step experiment, EAIN continues to reduce variance throughout training. The effect is especially pronounced in the later stages, showing more reliable convergence behavior.
            </p>
          </div>
        </section>

        {/* Summary Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-100">📊 Overall Summary</h2>
          <div className="bg-gray-900 text-gray-100 p-8 rounded-3xl space-y-6 leading-relaxed">
            <p>
              Across both 2M and 5M experiments, <span className="text-white font-bold">EAIN demonstrates a consistent advantage</span> in stabilizing policy learning without sacrificing performance. Selective suppression of entropy in less influential dimensions avoids harmful under-exploration.
            </p>
            <p>
              Importantly, <span className="text-white font-semibold underline decoration-blue-500 underline-offset-4">early-stage convergence speed is preserved</span>. As training progresses, the strengths of EAIN become increasingly apparent: <span className="text-white font-semibold underline decoration-blue-500 underline-offset-4">evaluation variance drops substantially</span>, and the learning curves exhibit <span className="text-white font-semibold underline decoration-blue-500 underline-offset-4">markedly more stable late-stage behavior</span>. This suggests that dimension-wise exploration control helps prevent the excessive, misaligned randomness that normally accumulates in high-dimensional action spaces.
            </p>
            <p>
            Overall, these results show that <span className="text-white font-semibold underline decoration-blue-500 underline-offset-4">EAIN effectively reduces variance while maintaining return levels and convergence speed</span>, ultimately delivering a more stable and reproducible training process for maximum entropy RL in high-dimensional continuous-control tasks.
            </p>
          </div>
        </section>

        {/* Next Steps Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-gray-100">🤔 What Can We Try Next?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border border-gray-100 rounded-2xl bg-gray-50 hover:border-blue-200 transition-colors">
              <h3 className="font-bold text-lg mb-4 text-blue-800">1. Early-Phase Uncertainty</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                During early training, the Q-function is inaccurate, making ∂Q/∂a signals noisy.
              </p>
              <ul className="text-xs space-y-2 text-gray-600">
                <li>• <strong>RND Bonus:</strong> Applying Random Network Distillation to encourage uniform signals early on.</li>
                <li>• <strong>Pretrained Prior:</strong> Using a pretrained EAIN as a starting point.</li>
              </ul>
            </div>
            <div className="p-6 border border-gray-100 rounded-2xl bg-gray-50 hover:border-blue-200 transition-colors">
              <h3 className="font-bold text-lg mb-4 text-blue-800">2. Boosting Weighting</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                Not just restricting exploration, but actively encouraging it in important dimensions.
              </p>
              <ul className="text-xs space-y-2 text-gray-600">
                <li>• <strong>Bold EAIN:</strong> Distributing weights so the sum equals action dimensionality, preserving total budget.</li>
              </ul>
            </div>
          </div>
        </section>

      </article>
    </div>
  );
};

export default ProjectDetail;
