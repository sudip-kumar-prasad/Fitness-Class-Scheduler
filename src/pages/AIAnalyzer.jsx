import Button from "../components/Button";

function AIAnalyzer() {
  return (
    <div className="ai-analyzer-container">
      <h1 className="ai-analyzer-title">AI Fitness Analyzer 🤖</h1>
      <p className="ai-analyzer-description">
        This page will use AI to analyze your workouts and progress (coming soon!).
      </p>
      <Button variant="primary">Start Analysis</Button>
    </div>
  );
}

export default AIAnalyzer;
