import CompletionHistory from '../components/CompletionHistory'

function HistoryPage({ completions, isHistoryLoading }) {
  return (
    <CompletionHistory
      completions={completions}
      isLoading={isHistoryLoading}
    />
  )
}

export default HistoryPage
