#include <bits/stdc++.h>
using namespace std;

#ifdef DEBUG
  #include "/Users/kutay/CP/templates/debug.h"
#else
  #define debug(...) void(38)
#endif

const int MAX_DEPTH = 5;
const int N = 8;

vector<vector<int>> board = { // neg means black pieces, 5 = rook, 4 = knight, 3 = bishop, 9 - queen, 2 = king, 1 = pawn
  {-5, -4, -3, -9, -2, -3, -4, -5},
  {-1, -1, -1, -1, -1, -1, -1, -1},
  {0, 0, 0, 0, 0, 0, 0, 0},
  {0, 0, 0, 0, 0, 0, 0, 0},
  {0, 0, 0, 0, 0, 0, 0, 0},
  {0, 0, 0, 0, 0, 0, 0, 0},
  {1, 1, 1, 1, 1, 1, 1, 1},
  {5, 4, 3, 9, 2, 3, 4, 5}
};

bool is_move_valid(string from, string to) {
  int from_i, from_j, to_i, to_j;
  from_i = N - (from[1] - '0');
  from_j = from[0] - 'a';
  to_i = N - (to[1] - '0');
  to_j = to[0] - 'a';
  int piece_val = abs(board[from_i][from_j]);
  if (piece_val == 1) {
  }
}

int32_t main() {
  ios_base::sync_with_stdio(0); cin.tie(0);
  while (true) {
    for (int i = 0; i < N; i++) {
      for (int j = 0; j < N; j++) {
        cout << board[i][j];
      }
    }
    string from, to; cin >> from >> to;
    if (is_move_valid(from, to) == false) continue;
  }
}
