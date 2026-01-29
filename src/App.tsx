import { Layout } from './components/layout';
import { PipelineView } from './components/pipeline';
import { AgentView } from './components/agent';
import { useVisualizationStore } from './store/visualizationStore';

function App() {
  const { currentPage } = useVisualizationStore();

  return (
    <Layout>
      {currentPage === 'pipeline' ? <PipelineView /> : <AgentView />}
    </Layout>
  );
}

export default App;
