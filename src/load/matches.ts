export type Matches = {
    result: {
        status: number;
        num_results: number;
        total_results: number;
        results_remaining: number;
        matches: {
            match_id: number;
            match_seq_num: number;
            start_time: number;
            lobby_type: number;
            radiant_team_id: number;
            dire_team_id: number;
            players: {
                account_id: number;
                player_slot: number;
                team_number: number;
                team_slot: number;
                hero_id: number;
            }[];
        }[];
    };
};
