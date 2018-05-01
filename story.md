define opening batsman
show scorebard

def can attempt
    has wickets ? && has remaining ? && has won ?

if can attempt
    attempt
        remaining-- 
        
        dot
            show outcome
        out
            show outcome
            choose next player
        runs
            show outcome
            swap if odd
        
        swap if over over
else
    check win
    check loose